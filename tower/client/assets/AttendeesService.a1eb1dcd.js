import{a as t,l as n,A as s}from"./index.5b7d70b7.js";import"./vendor.5f784ede.js";class d{async getEventAttendees(e){const a=await t.get("api/events/"+e+"/attendees");n.log("event attendees",a.data),s.attendees=a.data}async attendEvent(e){await t.post("api/attendees",e)}async getEventsForAccount(){const e=await t.get("account/attendees");n.log("accountAttend",e.data),s.myEvents=e.data}}const r=new d;export{r as a};
