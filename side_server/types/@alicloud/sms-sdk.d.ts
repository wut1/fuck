import * as DysmsapiClient from '@alicloud/dysmsapi'
import * as DybaseapiClient from '@alicloud/dybaseapi'
import * as MNSClient from '@alicloud/mns'

export class SMSClient {
    constructor(options)
    dysmsapiClient:DysmsapiClient;
    dybaseClient:DybaseapiClient;
    mnsClient:MNSClient[];
    expire:number[];
    receiveMsg(typeIndex:number,preQueueName:string,waitSeconds:number):Promise<any>
    sendSMS(params:any):Promise<any>;
    queryDetail(params:any):Promise<any>;
} 