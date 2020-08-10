import * as Busboy from 'busboy';
import * as path from "path";
import * as  fs from "fs";
import sha1 from "sha1";

// Gets a filename extension.
 let getExtension =(filename)=> {
    return filename.split(".").pop();
}

// Test if a image is valid based on its extension and mime type.
let isImageValid =(filename, mimetype)=> {
    let allowedExts = ["gif", "jpeg", "jpg", "png", "svg", "blob"];
    let allowedMimeTypes = ["image/gif", "image/jpeg", "image/pjpeg", "image/x-png", "image/png", "image/svg+xml"];

    // Get image extension.
    let extension = getExtension(filename);

    return allowedExts.indexOf(extension.toLowerCase()) != -1 &&
        allowedMimeTypes.indexOf(mimetype) != -1;
}

export let upload = (req, callback)=>{
    let busboy:any;
        // The route on which the image is saved.
    var fileRoute = "/uploads/";

    // Server side file path on which the image is saved.
    var saveToPath = null;

    // Flag to tell if a stream had an error.
    var hadStreamError = null;

    // Used for sending response.
    var link = null;

    // Stream error handler.
    let handleStreamError =(error)=>{
            // Do not enter twice in here.
        if (hadStreamError) {
            return;
        }

        hadStreamError = error;

        // Cleanup: delete the saved path.
        if (saveToPath) {
            return fs.unlink(saveToPath, function(err) {
                return callback(error);
            });
        }

        return callback(error);
    }

    // Instantiate Busboy.
    try {
        busboy = new Busboy({ headers: req.headers });
    } catch (e) {
        return callback(e);
    }

    // Handle file arrival.
    busboy.on("file", (fieldname, file, filename, encoding, mimetype)=>{
        // Check fieldname:
        if ("file" != fieldname) {
            // Stop receiving from this stream.
            file.resume();
            return callback("Fieldname is not correct. It must be file .");
        }

        // Generate link.
        var randomName = sha1(String(new Date().getTime())) + "." + getExtension(filename);
        link = fileRoute + randomName;

        // Generate path where the file will be saved.
        var appDir = path.dirname(require.main.filename);
        saveToPath = path.join(appDir, link);

        // Pipe reader stream (file from client) into writer stream (file from disk).
        file.on("error", handleStreamError);

        // Create stream writer to save to file to disk.
        var diskWriterStream = fs.createWriteStream(saveToPath);
        diskWriterStream.on("error", handleStreamError);

        // Validate image after it is successfully saved to disk.
        diskWriterStream.on("finish", ()=>{
            // Check if image is valid
            var status = isImageValid(saveToPath, mimetype);
            if (!status) {
                return handleStreamError("File does not meet the validation.");
            }

            return callback(null, { link: link });
        });

        // Save image to disk.
        file.pipe(diskWriterStream);
    });

    // Handle file upload termination.
    busboy.on("error", handleStreamError);
    req.on("error", handleStreamError);

    // Pipe reader stream into writer stream.
    return req.pipe(busboy);
}
