webpackJsonp([6],{eJUK:function(n,l,t){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var u=t("WT6e"),e=function(){},i=t("ItHS"),r=function(){function n(n){this.http=n}return n.prototype.getArticleDetail=function(n){return this.http.post(CONFIGNI.getArticleDetail,n)},n}(),a=t("bfOx"),o=(t("VwFy"),function(){function n(n,l,t){this.router=n,this.route=l,this.detailService=t}return n.prototype.ngOnInit=function(){var n=this;this.route.paramMap.switchMap(function(l){var t=l.get("id");return n.detailService.getArticleDetail({id:t})}).subscribe(function(l){1==l.resultCode&&(n.detail=l.resultObj)})},n}()),c=u._1({encapsulation:0,styles:[[".article-detail[_ngcontent-%COMP%]{margin:0 auto;padding:20px 2% 40px;max-width:620px;width:100%}"]],data:{}});function s(n){return u._25(0,[(n()(),u._3(0,0,null,null,7,"div",[["class","article-detail"]],null,null,null,null,null)),(n()(),u._23(-1,null,["\n    "])),(n()(),u._3(2,0,null,null,4,"article",[],null,null,null,null,null)),(n()(),u._23(-1,null,["\n        "])),(n()(),u._3(4,0,null,null,1,"section",[["class","show-content"]],[[8,"innerHTML",1]],null,null,null,null)),(n()(),u._23(-1,null,["\n\n        "])),(n()(),u._23(-1,null,["\n    "])),(n()(),u._23(-1,null,["\n"]))],null,function(n,l){var t=l.component;n(l,4,0,null==t.detail?null:t.detail.content)})}var _=u.Z("detail",o,function(n){return u._25(0,[(n()(),u._3(0,0,null,null,2,"detail",[],null,null,null,s,c)),u._19(512,null,r,r,[i.c]),u._2(2,114688,null,0,o,[a.l,a.a,r],null,null)],function(n,l){n(l,2,0)},null)},{},{},[]),d=t("Xjw4"),p=t("04IF");t.d(l,"DetailModuleNgFactory",function(){return f});var f=u._0(e,[],function(n){return u._11([u._12(512,u.j,u.W,[[8,[_]],[3,u.j],u.v]),u._12(4608,d.l,d.k,[u.s,[2,d.p]]),u._12(512,d.b,d.b,[]),u._12(512,a.n,a.n,[[2,a.s],[2,a.l]]),u._12(512,p.a,p.a,[]),u._12(512,e,e,[]),u._12(1024,a.j,function(){return[[{path:"",component:o}]]},[])])})}});