import { EventEmitter, errorMonitor } from "events";
const evtEmitter = new EventEmitter();

const lfn1 = (data) => console.log("lfn>>", data);

evtEmitter.addListener("evt1", (...args) => {
  console.log("evt1>>", args);
});
evtEmitter.on("evt1", lfn1);

evtEmitter.on("evt2", (data) => console.log("evt2--->>>", data));

// 단 한번만 실행되는 이벤트
evtEmitter.once("evt3", (data) => console.log("evt2-><", data));

evtEmitter.emit("evt1", "111");
evtEmitter.emit("evt1", "111-2");
evtEmitter.emit("evt2", "222");

evtEmitter.emit("evt3", "222"); // 한번만 실행된다
// evtEmitter.emit("evt3", "222");
evtEmitter.on(errorMonitor, (err) => console.error("ERR>>", err.message));

evtEmitter.removeListener("evt1", lfn1);

const cnt = evtEmitter.listenerCount("evt1");
console.log(cnt);
try {
  evtEmitter.emit("error", new Error("xxx"));
} catch (ErEr) {
  console.log("ErEr---->>", ErEr);
}
