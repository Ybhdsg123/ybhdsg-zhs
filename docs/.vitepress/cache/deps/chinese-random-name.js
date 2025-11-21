import {
  __commonJS,
  __require
} from "./chunk-KVCYZR2Q.js";

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/lib/polyfill_browserify.js
var require_polyfill_browserify = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/lib/polyfill_browserify.js"() {
    "use strict";
    if (!process.versions.node) {
      process.versions.node = "dummy";
    }
  }
});

// browser-external:path
var require_path = __commonJS({
  "browser-external:path"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "path" has been externalized for browser compatibility. Cannot access "path.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:fs
var require_fs = __commonJS({
  "browser-external:fs"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "fs" has been externalized for browser compatibility. Cannot access "fs.${key}" in client code. See https://vite.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/dist/19937.js
var require__ = __commonJS({
  "node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/dist/19937.js"(exports, module) {
    var Module = typeof Module != "undefined" ? Module : {};
    var moduleOverrides = Object.assign({}, Module);
    var arguments_ = [];
    var thisProgram = "./this.program";
    var quit_ = (status, toThrow) => {
      throw toThrow;
    };
    var ENVIRONMENT_IS_WEB = typeof window == "object";
    var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
    var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
    var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
    if (Module["ENVIRONMENT"]) {
      throw new Error("Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)");
    }
    var scriptDirectory = "";
    function locateFile(path) {
      if (Module["locateFile"]) {
        return Module["locateFile"](path, scriptDirectory);
      }
      return scriptDirectory + path;
    }
    var read_;
    var readAsync;
    var readBinary;
    var setWindowTitle;
    function logExceptionOnExit(e) {
      if (e instanceof ExitStatus) return;
      let toLog = e;
      if (e && typeof e == "object" && e.stack) {
        toLog = [e, e.stack];
      }
      err("exiting due to exception: " + toLog);
    }
    var fs;
    var nodePath;
    var requireNodeFS;
    if (ENVIRONMENT_IS_NODE) {
      if (!(typeof process == "object" && typeof __require == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = require_path().dirname(scriptDirectory) + "/";
      } else {
        scriptDirectory = __dirname + "/";
      }
      requireNodeFS = () => {
        if (!nodePath) {
          fs = require_fs();
          nodePath = require_path();
        }
      };
      read_ = function shell_read(filename, binary) {
        var ret = tryParseAsDataURI(filename);
        if (ret) {
          return binary ? ret : ret.toString();
        }
        requireNodeFS();
        filename = nodePath["normalize"](filename);
        return fs.readFileSync(filename, binary ? void 0 : "utf8");
      };
      readBinary = (filename) => {
        var ret = read_(filename, true);
        if (!ret.buffer) {
          ret = new Uint8Array(ret);
        }
        assert(ret.buffer);
        return ret;
      };
      readAsync = (filename, onload, onerror) => {
        var ret = tryParseAsDataURI(filename);
        if (ret) {
          onload(ret);
        }
        requireNodeFS();
        filename = nodePath["normalize"](filename);
        fs.readFile(filename, function(err2, data) {
          if (err2) onerror(err2);
          else onload(data.buffer);
        });
      };
      if (process["argv"].length > 1) {
        thisProgram = process["argv"][1].replace(/\\/g, "/");
      }
      arguments_ = process["argv"].slice(2);
      if (typeof module != "undefined") {
        module["exports"] = Module;
      }
      process["on"]("uncaughtException", function(ex) {
        if (!(ex instanceof ExitStatus)) {
          throw ex;
        }
      });
      process["on"]("unhandledRejection", function(reason) {
        throw reason;
      });
      quit_ = (status, toThrow) => {
        if (keepRuntimeAlive()) {
          process["exitCode"] = status;
          throw toThrow;
        }
        logExceptionOnExit(toThrow);
        process["exit"](status);
      };
      Module["inspect"] = function() {
        return "[Emscripten Module object]";
      };
    } else if (ENVIRONMENT_IS_SHELL) {
      if (typeof process == "object" && typeof __require === "function" || typeof window == "object" || typeof importScripts == "function") throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      if (typeof read != "undefined") {
        read_ = function shell_read(f) {
          const data = tryParseAsDataURI(f);
          if (data) {
            return intArrayToString(data);
          }
          return read(f);
        };
      }
      readBinary = function readBinary2(f) {
        let data;
        data = tryParseAsDataURI(f);
        if (data) {
          return data;
        }
        if (typeof readbuffer == "function") {
          return new Uint8Array(readbuffer(f));
        }
        data = read(f, "binary");
        assert(typeof data == "object");
        return data;
      };
      readAsync = function readAsync2(f, onload, onerror) {
        setTimeout(() => onload(readBinary(f)), 0);
      };
      if (typeof scriptArgs != "undefined") {
        arguments_ = scriptArgs;
      } else if (typeof arguments != "undefined") {
        arguments_ = arguments;
      }
      if (typeof quit == "function") {
        quit_ = (status, toThrow) => {
          if (runtimeKeepaliveCounter) {
            throw toThrow;
          }
          logExceptionOnExit(toThrow);
          quit(status);
        };
      }
      if (typeof print != "undefined") {
        if (typeof console == "undefined") console = /** @type{!Console} */
        {};
        console.log = /** @type{!function(this:Console, ...*): undefined} */
        print;
        console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */
        typeof printErr != "undefined" ? printErr : print;
      }
    } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
      if (ENVIRONMENT_IS_WORKER) {
        scriptDirectory = self.location.href;
      } else if (typeof document != "undefined" && document.currentScript) {
        scriptDirectory = document.currentScript.src;
      }
      if (scriptDirectory.indexOf("blob:") !== 0) {
        scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
      } else {
        scriptDirectory = "";
      }
      if (!(typeof window == "object" || typeof importScripts == "function")) throw new Error("not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)");
      {
        read_ = (url) => {
          try {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText;
          } catch (err2) {
            var data = tryParseAsDataURI(url);
            if (data) {
              return intArrayToString(data);
            }
            throw err2;
          }
        };
        if (ENVIRONMENT_IS_WORKER) {
          readBinary = (url) => {
            try {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(
                /** @type{!ArrayBuffer} */
                xhr.response
              );
            } catch (err2) {
              var data = tryParseAsDataURI(url);
              if (data) {
                return data;
              }
              throw err2;
            }
          };
        }
        readAsync = (url, onload, onerror) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
              onload(xhr.response);
              return;
            }
            var data = tryParseAsDataURI(url);
            if (data) {
              onload(data.buffer);
              return;
            }
            onerror();
          };
          xhr.onerror = onerror;
          xhr.send(null);
        };
      }
      setWindowTitle = (title) => document.title = title;
    } else {
      throw new Error("environment detection error");
    }
    var out = Module["print"] || console.log.bind(console);
    var err = Module["printErr"] || console.warn.bind(console);
    Object.assign(Module, moduleOverrides);
    moduleOverrides = null;
    checkIncomingModuleAPI();
    if (Module["arguments"]) arguments_ = Module["arguments"];
    legacyModuleProp("arguments", "arguments_");
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    legacyModuleProp("thisProgram", "thisProgram");
    if (Module["quit"]) quit_ = Module["quit"];
    legacyModuleProp("quit", "quit_");
    assert(typeof Module["memoryInitializerPrefixURL"] == "undefined", "Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["pthreadMainPrefixURL"] == "undefined", "Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["cdInitializerPrefixURL"] == "undefined", "Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["filePackagePrefixURL"] == "undefined", "Module.filePackagePrefixURL option was removed, use Module.locateFile instead");
    assert(typeof Module["read"] == "undefined", "Module.read option was removed (modify read_ in JS)");
    assert(typeof Module["readAsync"] == "undefined", "Module.readAsync option was removed (modify readAsync in JS)");
    assert(typeof Module["readBinary"] == "undefined", "Module.readBinary option was removed (modify readBinary in JS)");
    assert(typeof Module["setWindowTitle"] == "undefined", "Module.setWindowTitle option was removed (modify setWindowTitle in JS)");
    assert(typeof Module["TOTAL_MEMORY"] == "undefined", "Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY");
    legacyModuleProp("read", "read_");
    legacyModuleProp("readAsync", "readAsync");
    legacyModuleProp("readBinary", "readBinary");
    legacyModuleProp("setWindowTitle", "setWindowTitle");
    assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-s ENVIRONMENT` to enable.");
    function legacyModuleProp(prop, newName) {
      if (!Object.getOwnPropertyDescriptor(Module, prop)) {
        Object.defineProperty(Module, prop, {
          configurable: true,
          get: function() {
            abort("Module." + prop + " has been replaced with plain " + newName + " (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)");
          }
        });
      }
    }
    function ignoredModuleProp(prop) {
      if (Object.getOwnPropertyDescriptor(Module, prop)) {
        abort("`Module." + prop + "` was supplied but `" + prop + "` not included in INCOMING_MODULE_JS_API");
      }
    }
    function unexportedMessage(sym, isFSSybol) {
      var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
      if (isFSSybol) {
        msg += ". Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you";
      }
      return msg;
    }
    function unexportedRuntimeSymbol(sym, isFSSybol) {
      if (!Object.getOwnPropertyDescriptor(Module, sym)) {
        Object.defineProperty(Module, sym, {
          configurable: true,
          get: function() {
            abort(unexportedMessage(sym, isFSSybol));
          }
        });
      }
    }
    function unexportedRuntimeFunction(sym, isFSSybol) {
      if (!Object.getOwnPropertyDescriptor(Module, sym)) {
        Module[sym] = () => abort(unexportedMessage(sym, isFSSybol));
      }
    }
    var tempRet0 = 0;
    var setTempRet0 = (value) => {
      tempRet0 = value;
    };
    var getTempRet0 = () => tempRet0;
    var wasmBinary;
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    legacyModuleProp("wasmBinary", "wasmBinary");
    var noExitRuntime = Module["noExitRuntime"] || true;
    legacyModuleProp("noExitRuntime", "noExitRuntime");
    var WebAssembly = {
      // Note that we do not use closure quoting (this['buffer'], etc.) on these
      // functions, as they are just meant for internal use. In other words, this is
      // not a fully general polyfill.
      /** @constructor */
      Memory: function(opts) {
        this.buffer = new ArrayBuffer(opts["initial"] * 65536);
      },
      Module: function(binary) {
      },
      /** @constructor */
      Instance: function(module2, info) {
        this.exports = function instantiate(asmLibraryArg2) {
          function Table(ret) {
            ret.set = function(i2, func) {
              this[i2] = func;
            };
            ret.get = function(i2) {
              return this[i2];
            };
            return ret;
          }
          var bufferView;
          var base64ReverseLookup = new Uint8Array(
            123
            /*'z'+1*/
          );
          for (var i = 25; i >= 0; --i) {
            base64ReverseLookup[48 + i] = 52 + i;
            base64ReverseLookup[65 + i] = i;
            base64ReverseLookup[97 + i] = 26 + i;
          }
          base64ReverseLookup[43] = 62;
          base64ReverseLookup[47] = 63;
          function base64DecodeToExistingUint8Array(uint8Array, offset, b64) {
            var b1, b2, i2 = 0, j = offset, bLength = b64.length, end = offset + (bLength * 3 >> 2) - (b64[bLength - 2] == "=") - (b64[bLength - 1] == "=");
            for (; i2 < bLength; i2 += 4) {
              b1 = base64ReverseLookup[b64.charCodeAt(i2 + 1)];
              b2 = base64ReverseLookup[b64.charCodeAt(i2 + 2)];
              uint8Array[j++] = base64ReverseLookup[b64.charCodeAt(i2)] << 2 | b1 >> 4;
              if (j < end) uint8Array[j++] = b1 << 4 | b2 >> 2;
              if (j < end) uint8Array[j++] = b2 << 6 | base64ReverseLookup[b64.charCodeAt(i2 + 3)];
            }
          }
          function initActiveSegments(imports) {
            base64DecodeToExistingUint8Array(bufferView, 1024, "EAZQAA==");
            base64DecodeToExistingUint8Array(bufferView, 1028, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
          }
          function asmFunc(env) {
            var memory = env.memory;
            var buffer2 = memory.buffer;
            var HEAP82 = new Int8Array(buffer2);
            var HEAP162 = new Int16Array(buffer2);
            var HEAP322 = new Int32Array(buffer2);
            var HEAPU82 = new Uint8Array(buffer2);
            var HEAPU162 = new Uint16Array(buffer2);
            var HEAPU322 = new Uint32Array(buffer2);
            var HEAPF322 = new Float32Array(buffer2);
            var HEAPF642 = new Float64Array(buffer2);
            var Math_imul = Math.imul;
            var Math_fround = Math.fround;
            var Math_abs = Math.abs;
            var Math_clz32 = Math.clz32;
            var Math_min = Math.min;
            var Math_max = Math.max;
            var Math_floor = Math.floor;
            var Math_ceil = Math.ceil;
            var Math_trunc = Math.trunc;
            var Math_sqrt = Math.sqrt;
            var abort2 = env.abort;
            var nan = NaN;
            var infinity = Infinity;
            var fimport$0 = env.abort;
            var fimport$1 = env.emscripten_resize_heap;
            var global$0 = 5244432;
            var global$1 = 0;
            var global$2 = 0;
            var i64toi32_i32$HIGH_BITS = 0;
            ;
            function $0() {
              $40();
            }
            function $1() {
              return 2147483647 | 0;
            }
            function $2($0_1, $1_1, $2_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              $2_1 = $2_1 | 0;
              var $5_1 = 0, $7_1 = 0, $11_1 = 0;
              $5_1 = global$0 - 16 | 0;
              global$0 = $5_1;
              HEAP322[($5_1 + 12 | 0) >> 2] = $0_1;
              HEAP322[($5_1 + 8 | 0) >> 2] = $1_1;
              HEAP322[($5_1 + 4 | 0) >> 2] = $2_1;
              $7_1 = $33(2508 | 0) | 0;
              $3($7_1 | 0, HEAP322[($5_1 + 12 | 0) >> 2] | 0 | 0, HEAP322[($5_1 + 8 | 0) >> 2] | 0 | 0, HEAP322[($5_1 + 4 | 0) >> 2] | 0 | 0) | 0;
              HEAP322[$5_1 >> 2] = $7_1;
              $11_1 = HEAP322[$5_1 >> 2] | 0;
              global$0 = $5_1 + 16 | 0;
              return $11_1 | 0;
            }
            function $3($0_1, $1_1, $2_1, $3_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              $2_1 = $2_1 | 0;
              $3_1 = $3_1 | 0;
              var $6_1 = 0, $7_1 = 0;
              $6_1 = global$0 - 16 | 0;
              global$0 = $6_1;
              HEAP322[($6_1 + 12 | 0) >> 2] = $0_1;
              HEAP322[($6_1 + 8 | 0) >> 2] = $1_1;
              HEAP322[($6_1 + 4 | 0) >> 2] = $2_1;
              HEAP322[$6_1 >> 2] = $3_1;
              $7_1 = HEAP322[($6_1 + 12 | 0) >> 2] | 0;
              $4($7_1 | 0) | 0;
              $5($7_1 + 2500 | 0 | 0, HEAP322[($6_1 + 8 | 0) >> 2] | 0 | 0, HEAP322[($6_1 + 4 | 0) >> 2] | 0 | 0) | 0;
              $6($7_1 | 0, HEAP322[$6_1 >> 2] | 0 | 0);
              global$0 = $6_1 + 16 | 0;
              return $7_1 | 0;
            }
            function $4($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0, $4_1 = 0;
              $3_1 = global$0 - 16 | 0;
              global$0 = $3_1;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              $4_1 = HEAP322[($3_1 + 12 | 0) >> 2] | 0;
              $11($4_1 | 0, 5489 | 0) | 0;
              global$0 = $3_1 + 16 | 0;
              return $4_1 | 0;
            }
            function $5($0_1, $1_1, $2_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              $2_1 = $2_1 | 0;
              var $5_1 = 0, $6_1 = 0;
              $5_1 = global$0 - 16 | 0;
              global$0 = $5_1;
              HEAP322[($5_1 + 12 | 0) >> 2] = $0_1;
              HEAP322[($5_1 + 8 | 0) >> 2] = $1_1;
              HEAP322[($5_1 + 4 | 0) >> 2] = $2_1;
              $6_1 = HEAP322[($5_1 + 12 | 0) >> 2] | 0;
              $12($6_1 | 0, HEAP322[($5_1 + 8 | 0) >> 2] | 0 | 0, HEAP322[($5_1 + 4 | 0) >> 2] | 0 | 0) | 0;
              global$0 = $5_1 + 16 | 0;
              return $6_1 | 0;
            }
            function $6($0_1, $1_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              var $4_1 = 0, $5_1 = 0, $34_1 = 0;
              $4_1 = global$0 - 16 | 0;
              global$0 = $4_1;
              HEAP322[($4_1 + 12 | 0) >> 2] = $0_1;
              HEAP322[($4_1 + 8 | 0) >> 2] = $1_1;
              $5_1 = HEAP322[($4_1 + 12 | 0) >> 2] | 0;
              HEAP322[$5_1 >> 2] = (HEAP322[($4_1 + 8 | 0) >> 2] | 0) & -1 | 0;
              HEAP322[($4_1 + 4 | 0) >> 2] = 1;
              label$1: {
                label$2: while (1) {
                  if (!((HEAP322[($4_1 + 4 | 0) >> 2] | 0) >>> 0 < 624 >>> 0 & 1 | 0)) {
                    break label$1;
                  }
                  $34_1 = Math_imul((HEAP322[($5_1 + (((HEAP322[($4_1 + 4 | 0) >> 2] | 0) - 1 | 0) << 2 | 0) | 0) >> 2] | 0) ^ ($13(HEAP322[($5_1 + (((HEAP322[($4_1 + 4 | 0) >> 2] | 0) - 1 | 0) << 2 | 0) | 0) >> 2] | 0 | 0) | 0) | 0, 1812433253);
                  HEAP322[($5_1 + ((HEAP322[($4_1 + 4 | 0) >> 2] | 0) << 2 | 0) | 0) >> 2] = ($34_1 + (HEAP322[($4_1 + 4 | 0) >> 2] | 0) | 0) & -1 | 0;
                  HEAP322[($4_1 + 4 | 0) >> 2] = (HEAP322[($4_1 + 4 | 0) >> 2] | 0) + 1 | 0;
                  continue label$2;
                }
                ;
              }
              HEAP322[($5_1 + 2496 | 0) >> 2] = 0;
              global$0 = $4_1 + 16 | 0;
              return;
            }
            function $7($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0, $8_1 = 0;
              $3_1 = global$0 - 16 | 0;
              global$0 = $3_1;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              $8_1 = $8((HEAP322[($3_1 + 12 | 0) >> 2] | 0) + 2500 | 0 | 0, HEAP322[($3_1 + 12 | 0) >> 2] | 0 | 0) | 0;
              global$0 = $3_1 + 16 | 0;
              return $8_1 | 0;
            }
            function $8($0_1, $1_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              var $4_1 = 0, $5_1 = 0, $7_1 = 0;
              $4_1 = global$0 - 16 | 0;
              global$0 = $4_1;
              HEAP322[($4_1 + 12 | 0) >> 2] = $0_1;
              HEAP322[($4_1 + 8 | 0) >> 2] = $1_1;
              $5_1 = HEAP322[($4_1 + 12 | 0) >> 2] | 0;
              $7_1 = $9($5_1 | 0, HEAP322[($4_1 + 8 | 0) >> 2] | 0 | 0, $5_1 | 0) | 0;
              global$0 = $4_1 + 16 | 0;
              return $7_1 | 0;
            }
            function $9($0_1, $1_1, $2_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              $2_1 = $2_1 | 0;
              var $5_1 = 0, $69 = 0;
              $5_1 = global$0 - 112 | 0;
              global$0 = $5_1;
              HEAP322[($5_1 + 104 | 0) >> 2] = $0_1;
              HEAP322[($5_1 + 100 | 0) >> 2] = $1_1;
              HEAP322[($5_1 + 96 | 0) >> 2] = $2_1;
              HEAP322[($5_1 + 92 | 0) >> 2] = (($14(HEAP322[($5_1 + 96 | 0) >> 2] | 0 | 0) | 0) - ($15(HEAP322[($5_1 + 96 | 0) >> 2] | 0 | 0) | 0) | 0) + 1 | 0;
              label$1: {
                label$2: {
                  if (!((HEAP322[($5_1 + 92 | 0) >> 2] | 0 | 0) == (1 | 0) & 1 | 0)) {
                    break label$2;
                  }
                  HEAP322[($5_1 + 108 | 0) >> 2] = $15(HEAP322[($5_1 + 96 | 0) >> 2] | 0 | 0) | 0;
                  break label$1;
                }
                HEAP322[($5_1 + 88 | 0) >> 2] = 32;
                label$3: {
                  if (HEAP322[($5_1 + 92 | 0) >> 2] | 0) {
                    break label$3;
                  }
                  $16($5_1 + 48 | 0 | 0, HEAP322[($5_1 + 100 | 0) >> 2] | 0 | 0, 32 | 0) | 0;
                  HEAP322[($5_1 + 108 | 0) >> 2] = $17($5_1 + 48 | 0 | 0) | 0;
                  break label$1;
                }
                HEAP322[($5_1 + 44 | 0) >> 2] = (32 - ($18(HEAP322[($5_1 + 92 | 0) >> 2] | 0 | 0) | 0) | 0) - 1 | 0;
                label$4: {
                  if (!((HEAP322[($5_1 + 92 | 0) >> 2] | 0) & (($19() | 0) >>> (32 - (HEAP322[($5_1 + 44 | 0) >> 2] | 0) | 0) | 0) | 0)) {
                    break label$4;
                  }
                  HEAP322[($5_1 + 44 | 0) >> 2] = (HEAP322[($5_1 + 44 | 0) >> 2] | 0) + 1 | 0;
                }
                $16($5_1 + 8 | 0 | 0, HEAP322[($5_1 + 100 | 0) >> 2] | 0 | 0, HEAP322[($5_1 + 44 | 0) >> 2] | 0 | 0) | 0;
                label$5: while (1) {
                  HEAP322[($5_1 + 4 | 0) >> 2] = $17($5_1 + 8 | 0 | 0) | 0;
                  if ((HEAP322[($5_1 + 4 | 0) >> 2] | 0) >>> 0 >= (HEAP322[($5_1 + 92 | 0) >> 2] | 0) >>> 0 & 1 | 0) {
                    continue label$5;
                  }
                  break label$5;
                }
                ;
                HEAP322[($5_1 + 108 | 0) >> 2] = (HEAP322[($5_1 + 4 | 0) >> 2] | 0) + ($15(HEAP322[($5_1 + 96 | 0) >> 2] | 0 | 0) | 0) | 0;
              }
              $69 = HEAP322[($5_1 + 108 | 0) >> 2] | 0;
              global$0 = $5_1 + 112 | 0;
              return $69 | 0;
            }
            function $10($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0, $4_1 = 0;
              $3_1 = global$0 - 16 | 0;
              global$0 = $3_1;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              $4_1 = HEAP322[($3_1 + 12 | 0) >> 2] | 0;
              label$1: {
                if (($4_1 | 0) == (0 | 0) & 1 | 0) {
                  break label$1;
                }
                $34($4_1 | 0);
              }
              global$0 = $3_1 + 16 | 0;
              return;
            }
            function $11($0_1, $1_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              var $4_1 = 0, $5_1 = 0;
              $4_1 = global$0 - 16 | 0;
              global$0 = $4_1;
              HEAP322[($4_1 + 12 | 0) >> 2] = $0_1;
              HEAP322[($4_1 + 8 | 0) >> 2] = $1_1;
              $5_1 = HEAP322[($4_1 + 12 | 0) >> 2] | 0;
              $6($5_1 | 0, HEAP322[($4_1 + 8 | 0) >> 2] | 0 | 0);
              global$0 = $4_1 + 16 | 0;
              return $5_1 | 0;
            }
            function $12($0_1, $1_1, $2_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              $2_1 = $2_1 | 0;
              var $5_1 = 0, $6_1 = 0;
              $5_1 = global$0 - 16 | 0;
              HEAP322[($5_1 + 12 | 0) >> 2] = $0_1;
              HEAP322[($5_1 + 8 | 0) >> 2] = $1_1;
              HEAP322[($5_1 + 4 | 0) >> 2] = $2_1;
              $6_1 = HEAP322[($5_1 + 12 | 0) >> 2] | 0;
              HEAP322[$6_1 >> 2] = HEAP322[($5_1 + 8 | 0) >> 2] | 0;
              HEAP322[($6_1 + 4 | 0) >> 2] = HEAP322[($5_1 + 4 | 0) >> 2] | 0;
              return $6_1 | 0;
            }
            function $13($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return (HEAP322[($3_1 + 12 | 0) >> 2] | 0) >>> 30 | 0 | 0;
            }
            function $14($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return HEAP322[((HEAP322[($3_1 + 12 | 0) >> 2] | 0) + 4 | 0) >> 2] | 0 | 0;
            }
            function $15($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return HEAP322[(HEAP322[($3_1 + 12 | 0) >> 2] | 0) >> 2] | 0 | 0;
            }
            function $16($0_1, $1_1, $2_1) {
              $0_1 = $0_1 | 0;
              $1_1 = $1_1 | 0;
              $2_1 = $2_1 | 0;
              var $6_1 = 0, $5_1 = 0, $90 = 0, $107 = 0;
              $5_1 = global$0 - 16 | 0;
              HEAP322[($5_1 + 8 | 0) >> 2] = $0_1;
              HEAP322[($5_1 + 4 | 0) >> 2] = $1_1;
              HEAP322[$5_1 >> 2] = $2_1;
              $6_1 = HEAP322[($5_1 + 8 | 0) >> 2] | 0;
              HEAP322[($5_1 + 12 | 0) >> 2] = $6_1;
              HEAP322[$6_1 >> 2] = HEAP322[($5_1 + 4 | 0) >> 2] | 0;
              HEAP322[($6_1 + 4 | 0) >> 2] = HEAP322[$5_1 >> 2] | 0;
              HEAP322[($6_1 + 12 | 0) >> 2] = ((HEAP322[($6_1 + 4 | 0) >> 2] | 0) >>> 5 | 0) + (((HEAP322[($6_1 + 4 | 0) >> 2] | 0) & 31 | 0 | 0) != (0 | 0) & 1 | 0) | 0;
              HEAP322[($6_1 + 8 | 0) >> 2] = ((HEAP322[($6_1 + 4 | 0) >> 2] | 0) >>> 0) / ((HEAP322[($6_1 + 12 | 0) >> 2] | 0) >>> 0) | 0;
              HEAP322[($6_1 + 20 | 0) >> 2] = 0;
              label$1: {
                if (!((0 - (HEAP322[($6_1 + 20 | 0) >> 2] | 0) | 0) >>> 0 > (((HEAP322[($6_1 + 20 | 0) >> 2] | 0) >>> 0) / ((HEAP322[($6_1 + 12 | 0) >> 2] | 0) >>> 0) | 0) >>> 0 & 1 | 0)) {
                  break label$1;
                }
                HEAP322[($6_1 + 12 | 0) >> 2] = (HEAP322[($6_1 + 12 | 0) >> 2] | 0) + 1 | 0;
                HEAP322[($6_1 + 8 | 0) >> 2] = ((HEAP322[($6_1 + 4 | 0) >> 2] | 0) >>> 0) / ((HEAP322[($6_1 + 12 | 0) >> 2] | 0) >>> 0) | 0;
                label$2: {
                  label$3: {
                    if (!((HEAP322[($6_1 + 8 | 0) >> 2] | 0) >>> 0 < 32 >>> 0 & 1 | 0)) {
                      break label$3;
                    }
                    HEAP322[($6_1 + 20 | 0) >> 2] = (0 >>> (HEAP322[($6_1 + 8 | 0) >> 2] | 0) | 0) << (HEAP322[($6_1 + 8 | 0) >> 2] | 0) | 0;
                    break label$2;
                  }
                  HEAP322[($6_1 + 20 | 0) >> 2] = 0;
                }
              }
              HEAP322[($6_1 + 16 | 0) >> 2] = (HEAP322[($6_1 + 12 | 0) >> 2] | 0) - (((HEAP322[($6_1 + 4 | 0) >> 2] | 0) >>> 0) % ((HEAP322[($6_1 + 12 | 0) >> 2] | 0) >>> 0) | 0) | 0;
              label$4: {
                label$5: {
                  if (!((HEAP322[($6_1 + 8 | 0) >> 2] | 0) >>> 0 < 31 >>> 0 & 1 | 0)) {
                    break label$5;
                  }
                  HEAP322[($6_1 + 24 | 0) >> 2] = (0 >>> ((HEAP322[($6_1 + 8 | 0) >> 2] | 0) + 1 | 0) | 0) << ((HEAP322[($6_1 + 8 | 0) >> 2] | 0) + 1 | 0) | 0;
                  break label$4;
                }
                HEAP322[($6_1 + 24 | 0) >> 2] = 0;
              }
              label$6: {
                label$7: {
                  if (!((HEAP322[($6_1 + 8 | 0) >> 2] | 0) >>> 0 > 0 >>> 0 & 1 | 0)) {
                    break label$7;
                  }
                  $90 = -1 >>> (32 - (HEAP322[($6_1 + 8 | 0) >> 2] | 0) | 0) | 0;
                  break label$6;
                }
                $90 = 0;
              }
              HEAP322[($6_1 + 28 | 0) >> 2] = $90;
              label$8: {
                label$9: {
                  if (!((HEAP322[($6_1 + 8 | 0) >> 2] | 0) >>> 0 < 31 >>> 0 & 1 | 0)) {
                    break label$9;
                  }
                  $107 = -1 >>> (32 - ((HEAP322[($6_1 + 8 | 0) >> 2] | 0) + 1 | 0) | 0) | 0;
                  break label$8;
                }
                $107 = -1;
              }
              HEAP322[($6_1 + 32 | 0) >> 2] = $107;
              return HEAP322[($5_1 + 12 | 0) >> 2] | 0 | 0;
            }
            function $17($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0, $5_1 = 0;
              $3_1 = global$0 - 16 | 0;
              global$0 = $3_1;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              $5_1 = $20(HEAP322[($3_1 + 12 | 0) >> 2] | 0 | 0) | 0;
              global$0 = $3_1 + 16 | 0;
              return $5_1 | 0;
            }
            function $18($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return Math_clz32(HEAP322[($3_1 + 12 | 0) >> 2] | 0) | 0;
            }
            function $19() {
              return $21() | 0 | 0;
            }
            function $20($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0, $4_1 = 0, $8_1 = 0;
              $3_1 = global$0 - 16 | 0;
              global$0 = $3_1;
              HEAP322[($3_1 + 4 | 0) >> 2] = $0_1;
              $4_1 = HEAP322[($3_1 + 4 | 0) >> 2] | 0;
              $8_1 = ($22(HEAP322[$4_1 >> 2] | 0 | 0) | 0) & (HEAP322[($4_1 + 28 | 0) >> 2] | 0) | 0;
              global$0 = $3_1 + 16 | 0;
              return $8_1 | 0;
            }
            function $21() {
              return -1 | 0;
            }
            function $22($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0, $4_1 = 0, $38_1 = 0, $67 = 0, $73 = 0, $79 = 0;
              $3_1 = global$0 - 32 | 0;
              global$0 = $3_1;
              HEAP322[($3_1 + 28 | 0) >> 2] = $0_1;
              $4_1 = HEAP322[($3_1 + 28 | 0) >> 2] | 0;
              HEAP322[($3_1 + 24 | 0) >> 2] = (((HEAP322[($4_1 + 2496 | 0) >> 2] | 0) + 1 | 0) >>> 0) % (624 >>> 0) | 0;
              HEAP322[($3_1 + 20 | 0) >> 2] = 2147483647;
              HEAP322[($3_1 + 16 | 0) >> 2] = (HEAP322[($4_1 + ((HEAP322[($4_1 + 2496 | 0) >> 2] | 0) << 2 | 0) | 0) >> 2] | 0) & -2147483648 | 0 | ((HEAP322[($4_1 + ((HEAP322[($3_1 + 24 | 0) >> 2] | 0) << 2 | 0) | 0) >> 2] | 0) & 2147483647 | 0) | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = (((HEAP322[($4_1 + 2496 | 0) >> 2] | 0) + 397 | 0) >>> 0) % (624 >>> 0) | 0;
              $38_1 = (HEAP322[($4_1 + ((HEAP322[($3_1 + 12 | 0) >> 2] | 0) << 2 | 0) | 0) >> 2] | 0) ^ ($23(HEAP322[($3_1 + 16 | 0) >> 2] | 0 | 0) | 0) | 0;
              HEAP322[($4_1 + ((HEAP322[($4_1 + 2496 | 0) >> 2] | 0) << 2 | 0) | 0) >> 2] = $38_1 ^ Math_imul((HEAP322[($3_1 + 16 | 0) >> 2] | 0) & 1 | 0, -1727483681) | 0;
              HEAP322[($3_1 + 8 | 0) >> 2] = (HEAP322[($4_1 + ((HEAP322[($4_1 + 2496 | 0) >> 2] | 0) << 2 | 0) | 0) >> 2] | 0) ^ (($24(HEAP322[($4_1 + ((HEAP322[($4_1 + 2496 | 0) >> 2] | 0) << 2 | 0) | 0) >> 2] | 0 | 0) | 0) & -1 | 0) | 0;
              HEAP322[($4_1 + 2496 | 0) >> 2] = HEAP322[($3_1 + 24 | 0) >> 2] | 0;
              $67 = ($25(HEAP322[($3_1 + 8 | 0) >> 2] | 0 | 0) | 0) & -1658038656 | 0;
              HEAP322[($3_1 + 8 | 0) >> 2] = (HEAP322[($3_1 + 8 | 0) >> 2] | 0) ^ $67 | 0;
              $73 = ($26(HEAP322[($3_1 + 8 | 0) >> 2] | 0 | 0) | 0) & -272236544 | 0;
              HEAP322[($3_1 + 8 | 0) >> 2] = (HEAP322[($3_1 + 8 | 0) >> 2] | 0) ^ $73 | 0;
              $79 = (HEAP322[($3_1 + 8 | 0) >> 2] | 0) ^ ($27(HEAP322[($3_1 + 8 | 0) >> 2] | 0 | 0) | 0) | 0;
              global$0 = $3_1 + 32 | 0;
              return $79 | 0;
            }
            function $23($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return (HEAP322[($3_1 + 12 | 0) >> 2] | 0) >>> 1 | 0 | 0;
            }
            function $24($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return (HEAP322[($3_1 + 12 | 0) >> 2] | 0) >>> 11 | 0 | 0;
            }
            function $25($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return ((HEAP322[($3_1 + 12 | 0) >> 2] | 0) << 7 | 0) & -1 | 0 | 0;
            }
            function $26($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return ((HEAP322[($3_1 + 12 | 0) >> 2] | 0) << 15 | 0) & -1 | 0 | 0;
            }
            function $27($0_1) {
              $0_1 = $0_1 | 0;
              var $3_1 = 0;
              $3_1 = global$0 - 16 | 0;
              HEAP322[($3_1 + 12 | 0) >> 2] = $0_1;
              return (HEAP322[($3_1 + 12 | 0) >> 2] | 0) >>> 18 | 0 | 0;
            }
            function $28() {
              return __wasm_memory_size() << 16 | 0 | 0;
            }
            function $29() {
              return 1028 | 0;
            }
            function $30($0_1) {
              $0_1 = $0_1 | 0;
              var $1_1 = 0, $2_1 = 0;
              $1_1 = HEAP322[(0 + 1024 | 0) >> 2] | 0;
              $2_1 = ($0_1 + 3 | 0) & -4 | 0;
              $0_1 = $1_1 + $2_1 | 0;
              label$1: {
                label$2: {
                  if (!$2_1) {
                    break label$2;
                  }
                  if ($0_1 >>> 0 <= $1_1 >>> 0) {
                    break label$1;
                  }
                }
                label$3: {
                  if ($0_1 >>> 0 <= ($28() | 0) >>> 0) {
                    break label$3;
                  }
                  if (!(fimport$1($0_1 | 0) | 0)) {
                    break label$1;
                  }
                }
                HEAP322[(0 + 1024 | 0) >> 2] = $0_1;
                return $1_1 | 0;
              }
              HEAP322[($29() | 0) >> 2] = 48;
              return -1 | 0;
            }
            function $31($0_1) {
              $0_1 = $0_1 | 0;
              var $4_1 = 0, $6_1 = 0, $5_1 = 0, $8_1 = 0, $3_1 = 0, $2_1 = 0, $9_1 = 0, $11_1 = 0, $7_1 = 0, i64toi32_i32$0 = 0, i64toi32_i32$1 = 0, i64toi32_i32$2 = 0, $10_1 = 0, $1_1 = 0, $79 = 0, $92 = 0, $103 = 0, $111 = 0, $119 = 0, $210 = 0, $221 = 0, $229 = 0, $237 = 0, $272 = 0, $339 = 0, $346 = 0, $353 = 0, $447 = 0, $458 = 0, $466 = 0, $474 = 0, $1160 = 0, $1167 = 0, $1174 = 0, $1296 = 0, $1298 = 0, $1359 = 0, $1366 = 0, $1373 = 0, $1609 = 0, $1616 = 0, $1623 = 0;
              $1_1 = global$0 - 16 | 0;
              global$0 = $1_1;
              label$1: {
                label$2: {
                  label$3: {
                    label$4: {
                      label$5: {
                        label$6: {
                          label$7: {
                            label$8: {
                              label$9: {
                                label$10: {
                                  label$11: {
                                    label$12: {
                                      if ($0_1 >>> 0 > 244 >>> 0) {
                                        break label$12;
                                      }
                                      label$13: {
                                        $2_1 = HEAP322[(0 + 1032 | 0) >> 2] | 0;
                                        $3_1 = $0_1 >>> 0 < 11 >>> 0 ? 16 : ($0_1 + 11 | 0) & -8 | 0;
                                        $4_1 = $3_1 >>> 3 | 0;
                                        $0_1 = $2_1 >>> $4_1 | 0;
                                        if (!($0_1 & 3 | 0)) {
                                          break label$13;
                                        }
                                        $3_1 = (($0_1 ^ -1 | 0) & 1 | 0) + $4_1 | 0;
                                        $5_1 = $3_1 << 3 | 0;
                                        $4_1 = HEAP322[($5_1 + 1080 | 0) >> 2] | 0;
                                        $0_1 = $4_1 + 8 | 0;
                                        label$14: {
                                          label$15: {
                                            $6_1 = HEAP322[($4_1 + 8 | 0) >> 2] | 0;
                                            $5_1 = $5_1 + 1072 | 0;
                                            if (($6_1 | 0) != ($5_1 | 0)) {
                                              break label$15;
                                            }
                                            HEAP322[(0 + 1032 | 0) >> 2] = $2_1 & (__wasm_rotl_i32(-2 | 0, $3_1 | 0) | 0) | 0;
                                            break label$14;
                                          }
                                          HEAP322[($6_1 + 12 | 0) >> 2] = $5_1;
                                          HEAP322[($5_1 + 8 | 0) >> 2] = $6_1;
                                        }
                                        $3_1 = $3_1 << 3 | 0;
                                        HEAP322[($4_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                                        $4_1 = $4_1 + $3_1 | 0;
                                        HEAP322[($4_1 + 4 | 0) >> 2] = HEAP322[($4_1 + 4 | 0) >> 2] | 0 | 1 | 0;
                                        break label$1;
                                      }
                                      $7_1 = HEAP322[(0 + 1040 | 0) >> 2] | 0;
                                      if ($3_1 >>> 0 <= $7_1 >>> 0) {
                                        break label$11;
                                      }
                                      label$16: {
                                        if (!$0_1) {
                                          break label$16;
                                        }
                                        label$17: {
                                          label$18: {
                                            $79 = $0_1 << $4_1 | 0;
                                            $0_1 = 2 << $4_1 | 0;
                                            $0_1 = $79 & ($0_1 | (0 - $0_1 | 0) | 0) | 0;
                                            $0_1 = ($0_1 & (0 - $0_1 | 0) | 0) + -1 | 0;
                                            $92 = $0_1;
                                            $0_1 = ($0_1 >>> 12 | 0) & 16 | 0;
                                            $4_1 = $92 >>> $0_1 | 0;
                                            $6_1 = ($4_1 >>> 5 | 0) & 8 | 0;
                                            $103 = $6_1 | $0_1 | 0;
                                            $0_1 = $4_1 >>> $6_1 | 0;
                                            $4_1 = ($0_1 >>> 2 | 0) & 4 | 0;
                                            $111 = $103 | $4_1 | 0;
                                            $0_1 = $0_1 >>> $4_1 | 0;
                                            $4_1 = ($0_1 >>> 1 | 0) & 2 | 0;
                                            $119 = $111 | $4_1 | 0;
                                            $0_1 = $0_1 >>> $4_1 | 0;
                                            $4_1 = ($0_1 >>> 1 | 0) & 1 | 0;
                                            $6_1 = ($119 | $4_1 | 0) + ($0_1 >>> $4_1 | 0) | 0;
                                            $5_1 = $6_1 << 3 | 0;
                                            $4_1 = HEAP322[($5_1 + 1080 | 0) >> 2] | 0;
                                            $0_1 = HEAP322[($4_1 + 8 | 0) >> 2] | 0;
                                            $5_1 = $5_1 + 1072 | 0;
                                            if (($0_1 | 0) != ($5_1 | 0)) {
                                              break label$18;
                                            }
                                            $2_1 = $2_1 & (__wasm_rotl_i32(-2 | 0, $6_1 | 0) | 0) | 0;
                                            HEAP322[(0 + 1032 | 0) >> 2] = $2_1;
                                            break label$17;
                                          }
                                          HEAP322[($0_1 + 12 | 0) >> 2] = $5_1;
                                          HEAP322[($5_1 + 8 | 0) >> 2] = $0_1;
                                        }
                                        $0_1 = $4_1 + 8 | 0;
                                        HEAP322[($4_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                                        $5_1 = $4_1 + $3_1 | 0;
                                        $6_1 = $6_1 << 3 | 0;
                                        $3_1 = $6_1 - $3_1 | 0;
                                        HEAP322[($5_1 + 4 | 0) >> 2] = $3_1 | 1 | 0;
                                        HEAP322[($4_1 + $6_1 | 0) >> 2] = $3_1;
                                        label$19: {
                                          if (!$7_1) {
                                            break label$19;
                                          }
                                          $8_1 = $7_1 >>> 3 | 0;
                                          $6_1 = ($8_1 << 3 | 0) + 1072 | 0;
                                          $4_1 = HEAP322[(0 + 1052 | 0) >> 2] | 0;
                                          label$20: {
                                            label$21: {
                                              $8_1 = 1 << $8_1 | 0;
                                              if ($2_1 & $8_1 | 0) {
                                                break label$21;
                                              }
                                              HEAP322[(0 + 1032 | 0) >> 2] = $2_1 | $8_1 | 0;
                                              $8_1 = $6_1;
                                              break label$20;
                                            }
                                            $8_1 = HEAP322[($6_1 + 8 | 0) >> 2] | 0;
                                          }
                                          HEAP322[($6_1 + 8 | 0) >> 2] = $4_1;
                                          HEAP322[($8_1 + 12 | 0) >> 2] = $4_1;
                                          HEAP322[($4_1 + 12 | 0) >> 2] = $6_1;
                                          HEAP322[($4_1 + 8 | 0) >> 2] = $8_1;
                                        }
                                        HEAP322[(0 + 1052 | 0) >> 2] = $5_1;
                                        HEAP322[(0 + 1040 | 0) >> 2] = $3_1;
                                        break label$1;
                                      }
                                      $9_1 = HEAP322[(0 + 1036 | 0) >> 2] | 0;
                                      if (!$9_1) {
                                        break label$11;
                                      }
                                      $0_1 = ($9_1 & (0 - $9_1 | 0) | 0) + -1 | 0;
                                      $210 = $0_1;
                                      $0_1 = ($0_1 >>> 12 | 0) & 16 | 0;
                                      $4_1 = $210 >>> $0_1 | 0;
                                      $6_1 = ($4_1 >>> 5 | 0) & 8 | 0;
                                      $221 = $6_1 | $0_1 | 0;
                                      $0_1 = $4_1 >>> $6_1 | 0;
                                      $4_1 = ($0_1 >>> 2 | 0) & 4 | 0;
                                      $229 = $221 | $4_1 | 0;
                                      $0_1 = $0_1 >>> $4_1 | 0;
                                      $4_1 = ($0_1 >>> 1 | 0) & 2 | 0;
                                      $237 = $229 | $4_1 | 0;
                                      $0_1 = $0_1 >>> $4_1 | 0;
                                      $4_1 = ($0_1 >>> 1 | 0) & 1 | 0;
                                      $5_1 = HEAP322[(((($237 | $4_1 | 0) + ($0_1 >>> $4_1 | 0) | 0) << 2 | 0) + 1336 | 0) >> 2] | 0;
                                      $4_1 = ((HEAP322[($5_1 + 4 | 0) >> 2] | 0) & -8 | 0) - $3_1 | 0;
                                      $6_1 = $5_1;
                                      label$22: {
                                        label$23: while (1) {
                                          label$24: {
                                            $0_1 = HEAP322[($6_1 + 16 | 0) >> 2] | 0;
                                            if ($0_1) {
                                              break label$24;
                                            }
                                            $0_1 = HEAP322[($6_1 + 20 | 0) >> 2] | 0;
                                            if (!$0_1) {
                                              break label$22;
                                            }
                                          }
                                          $6_1 = ((HEAP322[($0_1 + 4 | 0) >> 2] | 0) & -8 | 0) - $3_1 | 0;
                                          $272 = $6_1;
                                          $6_1 = $6_1 >>> 0 < $4_1 >>> 0;
                                          $4_1 = $6_1 ? $272 : $4_1;
                                          $5_1 = $6_1 ? $0_1 : $5_1;
                                          $6_1 = $0_1;
                                          continue label$23;
                                        }
                                        ;
                                      }
                                      $10_1 = HEAP322[($5_1 + 24 | 0) >> 2] | 0;
                                      label$25: {
                                        $8_1 = HEAP322[($5_1 + 12 | 0) >> 2] | 0;
                                        if (($8_1 | 0) == ($5_1 | 0)) {
                                          break label$25;
                                        }
                                        $0_1 = HEAP322[($5_1 + 8 | 0) >> 2] | 0;
                                        HEAP322[(0 + 1048 | 0) >> 2] | 0;
                                        HEAP322[($0_1 + 12 | 0) >> 2] = $8_1;
                                        HEAP322[($8_1 + 8 | 0) >> 2] = $0_1;
                                        break label$2;
                                      }
                                      label$26: {
                                        $6_1 = $5_1 + 20 | 0;
                                        $0_1 = HEAP322[$6_1 >> 2] | 0;
                                        if ($0_1) {
                                          break label$26;
                                        }
                                        $0_1 = HEAP322[($5_1 + 16 | 0) >> 2] | 0;
                                        if (!$0_1) {
                                          break label$10;
                                        }
                                        $6_1 = $5_1 + 16 | 0;
                                      }
                                      label$27: while (1) {
                                        $11_1 = $6_1;
                                        $8_1 = $0_1;
                                        $6_1 = $0_1 + 20 | 0;
                                        $0_1 = HEAP322[$6_1 >> 2] | 0;
                                        if ($0_1) {
                                          continue label$27;
                                        }
                                        $6_1 = $8_1 + 16 | 0;
                                        $0_1 = HEAP322[($8_1 + 16 | 0) >> 2] | 0;
                                        if ($0_1) {
                                          continue label$27;
                                        }
                                        break label$27;
                                      }
                                      ;
                                      HEAP322[$11_1 >> 2] = 0;
                                      break label$2;
                                    }
                                    $3_1 = -1;
                                    if ($0_1 >>> 0 > -65 >>> 0) {
                                      break label$11;
                                    }
                                    $0_1 = $0_1 + 11 | 0;
                                    $3_1 = $0_1 & -8 | 0;
                                    $9_1 = HEAP322[(0 + 1036 | 0) >> 2] | 0;
                                    if (!$9_1) {
                                      break label$11;
                                    }
                                    $7_1 = 0;
                                    label$28: {
                                      if ($3_1 >>> 0 < 256 >>> 0) {
                                        break label$28;
                                      }
                                      $7_1 = 31;
                                      if ($3_1 >>> 0 > 16777215 >>> 0) {
                                        break label$28;
                                      }
                                      $0_1 = $0_1 >>> 8 | 0;
                                      $339 = $0_1;
                                      $0_1 = (($0_1 + 1048320 | 0) >>> 16 | 0) & 8 | 0;
                                      $4_1 = $339 << $0_1 | 0;
                                      $346 = $4_1;
                                      $4_1 = (($4_1 + 520192 | 0) >>> 16 | 0) & 4 | 0;
                                      $6_1 = $346 << $4_1 | 0;
                                      $353 = $6_1;
                                      $6_1 = (($6_1 + 245760 | 0) >>> 16 | 0) & 2 | 0;
                                      $0_1 = (($353 << $6_1 | 0) >>> 15 | 0) - ($0_1 | $4_1 | 0 | $6_1 | 0) | 0;
                                      $7_1 = ($0_1 << 1 | 0 | (($3_1 >>> ($0_1 + 21 | 0) | 0) & 1 | 0) | 0) + 28 | 0;
                                    }
                                    $4_1 = 0 - $3_1 | 0;
                                    label$29: {
                                      label$30: {
                                        label$31: {
                                          label$32: {
                                            $6_1 = HEAP322[(($7_1 << 2 | 0) + 1336 | 0) >> 2] | 0;
                                            if ($6_1) {
                                              break label$32;
                                            }
                                            $0_1 = 0;
                                            $8_1 = 0;
                                            break label$31;
                                          }
                                          $0_1 = 0;
                                          $5_1 = $3_1 << (($7_1 | 0) == (31 | 0) ? 0 : 25 - ($7_1 >>> 1 | 0) | 0) | 0;
                                          $8_1 = 0;
                                          label$33: while (1) {
                                            label$34: {
                                              $2_1 = (HEAP322[($6_1 + 4 | 0) >> 2] | 0) & -8 | 0;
                                              $11_1 = $2_1 - $3_1 | 0;
                                              if ($11_1 >>> 0 >= $4_1 >>> 0) {
                                                break label$34;
                                              }
                                              $4_1 = $11_1;
                                              $8_1 = $6_1;
                                              if (($2_1 | 0) != ($3_1 | 0)) {
                                                break label$34;
                                              }
                                              $4_1 = 0;
                                              $8_1 = $6_1;
                                              $0_1 = $6_1;
                                              break label$30;
                                            }
                                            $2_1 = HEAP322[($6_1 + 20 | 0) >> 2] | 0;
                                            $6_1 = HEAP322[(($6_1 + (($5_1 >>> 29 | 0) & 4 | 0) | 0) + 16 | 0) >> 2] | 0;
                                            $0_1 = $2_1 ? ($2_1 | 0) == ($6_1 | 0) ? $0_1 : $2_1 : $0_1;
                                            $5_1 = $5_1 << 1 | 0;
                                            if ($6_1) {
                                              continue label$33;
                                            }
                                            break label$33;
                                          }
                                          ;
                                        }
                                        label$35: {
                                          if ($0_1 | $8_1 | 0) {
                                            break label$35;
                                          }
                                          $8_1 = 0;
                                          $0_1 = 2 << $7_1 | 0;
                                          $0_1 = ($0_1 | (0 - $0_1 | 0) | 0) & $9_1 | 0;
                                          if (!$0_1) {
                                            break label$11;
                                          }
                                          $0_1 = ($0_1 & (0 - $0_1 | 0) | 0) + -1 | 0;
                                          $447 = $0_1;
                                          $0_1 = ($0_1 >>> 12 | 0) & 16 | 0;
                                          $6_1 = $447 >>> $0_1 | 0;
                                          $5_1 = ($6_1 >>> 5 | 0) & 8 | 0;
                                          $458 = $5_1 | $0_1 | 0;
                                          $0_1 = $6_1 >>> $5_1 | 0;
                                          $6_1 = ($0_1 >>> 2 | 0) & 4 | 0;
                                          $466 = $458 | $6_1 | 0;
                                          $0_1 = $0_1 >>> $6_1 | 0;
                                          $6_1 = ($0_1 >>> 1 | 0) & 2 | 0;
                                          $474 = $466 | $6_1 | 0;
                                          $0_1 = $0_1 >>> $6_1 | 0;
                                          $6_1 = ($0_1 >>> 1 | 0) & 1 | 0;
                                          $0_1 = HEAP322[(((($474 | $6_1 | 0) + ($0_1 >>> $6_1 | 0) | 0) << 2 | 0) + 1336 | 0) >> 2] | 0;
                                        }
                                        if (!$0_1) {
                                          break label$29;
                                        }
                                      }
                                      label$36: while (1) {
                                        $2_1 = ((HEAP322[($0_1 + 4 | 0) >> 2] | 0) & -8 | 0) - $3_1 | 0;
                                        $5_1 = $2_1 >>> 0 < $4_1 >>> 0;
                                        label$37: {
                                          $6_1 = HEAP322[($0_1 + 16 | 0) >> 2] | 0;
                                          if ($6_1) {
                                            break label$37;
                                          }
                                          $6_1 = HEAP322[($0_1 + 20 | 0) >> 2] | 0;
                                        }
                                        $4_1 = $5_1 ? $2_1 : $4_1;
                                        $8_1 = $5_1 ? $0_1 : $8_1;
                                        $0_1 = $6_1;
                                        if ($0_1) {
                                          continue label$36;
                                        }
                                        break label$36;
                                      }
                                      ;
                                    }
                                    if (!$8_1) {
                                      break label$11;
                                    }
                                    if ($4_1 >>> 0 >= ((HEAP322[(0 + 1040 | 0) >> 2] | 0) - $3_1 | 0) >>> 0) {
                                      break label$11;
                                    }
                                    $11_1 = HEAP322[($8_1 + 24 | 0) >> 2] | 0;
                                    label$38: {
                                      $5_1 = HEAP322[($8_1 + 12 | 0) >> 2] | 0;
                                      if (($5_1 | 0) == ($8_1 | 0)) {
                                        break label$38;
                                      }
                                      $0_1 = HEAP322[($8_1 + 8 | 0) >> 2] | 0;
                                      HEAP322[(0 + 1048 | 0) >> 2] | 0;
                                      HEAP322[($0_1 + 12 | 0) >> 2] = $5_1;
                                      HEAP322[($5_1 + 8 | 0) >> 2] = $0_1;
                                      break label$3;
                                    }
                                    label$39: {
                                      $6_1 = $8_1 + 20 | 0;
                                      $0_1 = HEAP322[$6_1 >> 2] | 0;
                                      if ($0_1) {
                                        break label$39;
                                      }
                                      $0_1 = HEAP322[($8_1 + 16 | 0) >> 2] | 0;
                                      if (!$0_1) {
                                        break label$9;
                                      }
                                      $6_1 = $8_1 + 16 | 0;
                                    }
                                    label$40: while (1) {
                                      $2_1 = $6_1;
                                      $5_1 = $0_1;
                                      $6_1 = $0_1 + 20 | 0;
                                      $0_1 = HEAP322[$6_1 >> 2] | 0;
                                      if ($0_1) {
                                        continue label$40;
                                      }
                                      $6_1 = $5_1 + 16 | 0;
                                      $0_1 = HEAP322[($5_1 + 16 | 0) >> 2] | 0;
                                      if ($0_1) {
                                        continue label$40;
                                      }
                                      break label$40;
                                    }
                                    ;
                                    HEAP322[$2_1 >> 2] = 0;
                                    break label$3;
                                  }
                                  label$41: {
                                    $0_1 = HEAP322[(0 + 1040 | 0) >> 2] | 0;
                                    if ($0_1 >>> 0 < $3_1 >>> 0) {
                                      break label$41;
                                    }
                                    $4_1 = HEAP322[(0 + 1052 | 0) >> 2] | 0;
                                    label$42: {
                                      label$43: {
                                        $6_1 = $0_1 - $3_1 | 0;
                                        if ($6_1 >>> 0 < 16 >>> 0) {
                                          break label$43;
                                        }
                                        HEAP322[(0 + 1040 | 0) >> 2] = $6_1;
                                        $5_1 = $4_1 + $3_1 | 0;
                                        HEAP322[(0 + 1052 | 0) >> 2] = $5_1;
                                        HEAP322[($5_1 + 4 | 0) >> 2] = $6_1 | 1 | 0;
                                        HEAP322[($4_1 + $0_1 | 0) >> 2] = $6_1;
                                        HEAP322[($4_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                                        break label$42;
                                      }
                                      HEAP322[(0 + 1052 | 0) >> 2] = 0;
                                      HEAP322[(0 + 1040 | 0) >> 2] = 0;
                                      HEAP322[($4_1 + 4 | 0) >> 2] = $0_1 | 3 | 0;
                                      $0_1 = $4_1 + $0_1 | 0;
                                      HEAP322[($0_1 + 4 | 0) >> 2] = HEAP322[($0_1 + 4 | 0) >> 2] | 0 | 1 | 0;
                                    }
                                    $0_1 = $4_1 + 8 | 0;
                                    break label$1;
                                  }
                                  label$44: {
                                    $5_1 = HEAP322[(0 + 1044 | 0) >> 2] | 0;
                                    if ($5_1 >>> 0 <= $3_1 >>> 0) {
                                      break label$44;
                                    }
                                    $4_1 = $5_1 - $3_1 | 0;
                                    HEAP322[(0 + 1044 | 0) >> 2] = $4_1;
                                    $0_1 = HEAP322[(0 + 1056 | 0) >> 2] | 0;
                                    $6_1 = $0_1 + $3_1 | 0;
                                    HEAP322[(0 + 1056 | 0) >> 2] = $6_1;
                                    HEAP322[($6_1 + 4 | 0) >> 2] = $4_1 | 1 | 0;
                                    HEAP322[($0_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                                    $0_1 = $0_1 + 8 | 0;
                                    break label$1;
                                  }
                                  label$45: {
                                    label$46: {
                                      if (!(HEAP322[(0 + 1504 | 0) >> 2] | 0)) {
                                        break label$46;
                                      }
                                      $4_1 = HEAP322[(0 + 1512 | 0) >> 2] | 0;
                                      break label$45;
                                    }
                                    i64toi32_i32$1 = 0;
                                    i64toi32_i32$0 = -1;
                                    HEAP322[(i64toi32_i32$1 + 1516 | 0) >> 2] = -1;
                                    HEAP322[(i64toi32_i32$1 + 1520 | 0) >> 2] = i64toi32_i32$0;
                                    i64toi32_i32$1 = 0;
                                    i64toi32_i32$0 = 4096;
                                    HEAP322[(i64toi32_i32$1 + 1508 | 0) >> 2] = 4096;
                                    HEAP322[(i64toi32_i32$1 + 1512 | 0) >> 2] = i64toi32_i32$0;
                                    HEAP322[(0 + 1504 | 0) >> 2] = (($1_1 + 12 | 0) & -16 | 0) ^ 1431655768 | 0;
                                    HEAP322[(0 + 1524 | 0) >> 2] = 0;
                                    HEAP322[(0 + 1476 | 0) >> 2] = 0;
                                    $4_1 = 4096;
                                  }
                                  $0_1 = 0;
                                  $7_1 = $3_1 + 47 | 0;
                                  $2_1 = $4_1 + $7_1 | 0;
                                  $11_1 = 0 - $4_1 | 0;
                                  $8_1 = $2_1 & $11_1 | 0;
                                  if ($8_1 >>> 0 <= $3_1 >>> 0) {
                                    break label$1;
                                  }
                                  $0_1 = 0;
                                  label$47: {
                                    $4_1 = HEAP322[(0 + 1472 | 0) >> 2] | 0;
                                    if (!$4_1) {
                                      break label$47;
                                    }
                                    $6_1 = HEAP322[(0 + 1464 | 0) >> 2] | 0;
                                    $9_1 = $6_1 + $8_1 | 0;
                                    if ($9_1 >>> 0 <= $6_1 >>> 0) {
                                      break label$1;
                                    }
                                    if ($9_1 >>> 0 > $4_1 >>> 0) {
                                      break label$1;
                                    }
                                  }
                                  if ((HEAPU82[(0 + 1476 | 0) >> 0] | 0) & 4 | 0) {
                                    break label$6;
                                  }
                                  label$48: {
                                    label$49: {
                                      label$50: {
                                        $4_1 = HEAP322[(0 + 1056 | 0) >> 2] | 0;
                                        if (!$4_1) {
                                          break label$50;
                                        }
                                        $0_1 = 1480;
                                        label$51: while (1) {
                                          label$52: {
                                            $6_1 = HEAP322[$0_1 >> 2] | 0;
                                            if ($6_1 >>> 0 > $4_1 >>> 0) {
                                              break label$52;
                                            }
                                            if (($6_1 + (HEAP322[($0_1 + 4 | 0) >> 2] | 0) | 0) >>> 0 > $4_1 >>> 0) {
                                              break label$49;
                                            }
                                          }
                                          $0_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                                          if ($0_1) {
                                            continue label$51;
                                          }
                                          break label$51;
                                        }
                                        ;
                                      }
                                      $5_1 = $30(0 | 0) | 0;
                                      if (($5_1 | 0) == (-1 | 0)) {
                                        break label$7;
                                      }
                                      $2_1 = $8_1;
                                      label$53: {
                                        $0_1 = HEAP322[(0 + 1508 | 0) >> 2] | 0;
                                        $4_1 = $0_1 + -1 | 0;
                                        if (!($4_1 & $5_1 | 0)) {
                                          break label$53;
                                        }
                                        $2_1 = ($8_1 - $5_1 | 0) + (($4_1 + $5_1 | 0) & (0 - $0_1 | 0) | 0) | 0;
                                      }
                                      if ($2_1 >>> 0 <= $3_1 >>> 0) {
                                        break label$7;
                                      }
                                      if ($2_1 >>> 0 > 2147483646 >>> 0) {
                                        break label$7;
                                      }
                                      label$54: {
                                        $0_1 = HEAP322[(0 + 1472 | 0) >> 2] | 0;
                                        if (!$0_1) {
                                          break label$54;
                                        }
                                        $4_1 = HEAP322[(0 + 1464 | 0) >> 2] | 0;
                                        $6_1 = $4_1 + $2_1 | 0;
                                        if ($6_1 >>> 0 <= $4_1 >>> 0) {
                                          break label$7;
                                        }
                                        if ($6_1 >>> 0 > $0_1 >>> 0) {
                                          break label$7;
                                        }
                                      }
                                      $0_1 = $30($2_1 | 0) | 0;
                                      if (($0_1 | 0) != ($5_1 | 0)) {
                                        break label$48;
                                      }
                                      break label$5;
                                    }
                                    $2_1 = ($2_1 - $5_1 | 0) & $11_1 | 0;
                                    if ($2_1 >>> 0 > 2147483646 >>> 0) {
                                      break label$7;
                                    }
                                    $5_1 = $30($2_1 | 0) | 0;
                                    if (($5_1 | 0) == ((HEAP322[$0_1 >> 2] | 0) + (HEAP322[($0_1 + 4 | 0) >> 2] | 0) | 0 | 0)) {
                                      break label$8;
                                    }
                                    $0_1 = $5_1;
                                  }
                                  label$55: {
                                    if (($0_1 | 0) == (-1 | 0)) {
                                      break label$55;
                                    }
                                    if (($3_1 + 48 | 0) >>> 0 <= $2_1 >>> 0) {
                                      break label$55;
                                    }
                                    label$56: {
                                      $4_1 = HEAP322[(0 + 1512 | 0) >> 2] | 0;
                                      $4_1 = (($7_1 - $2_1 | 0) + $4_1 | 0) & (0 - $4_1 | 0) | 0;
                                      if ($4_1 >>> 0 <= 2147483646 >>> 0) {
                                        break label$56;
                                      }
                                      $5_1 = $0_1;
                                      break label$5;
                                    }
                                    label$57: {
                                      if (($30($4_1 | 0) | 0 | 0) == (-1 | 0)) {
                                        break label$57;
                                      }
                                      $2_1 = $4_1 + $2_1 | 0;
                                      $5_1 = $0_1;
                                      break label$5;
                                    }
                                    $30(0 - $2_1 | 0 | 0) | 0;
                                    break label$7;
                                  }
                                  $5_1 = $0_1;
                                  if (($0_1 | 0) != (-1 | 0)) {
                                    break label$5;
                                  }
                                  break label$7;
                                }
                                $8_1 = 0;
                                break label$2;
                              }
                              $5_1 = 0;
                              break label$3;
                            }
                            if (($5_1 | 0) != (-1 | 0)) {
                              break label$5;
                            }
                          }
                          HEAP322[(0 + 1476 | 0) >> 2] = HEAP322[(0 + 1476 | 0) >> 2] | 0 | 4 | 0;
                        }
                        if ($8_1 >>> 0 > 2147483646 >>> 0) {
                          break label$4;
                        }
                        $5_1 = $30($8_1 | 0) | 0;
                        $0_1 = $30(0 | 0) | 0;
                        if (($5_1 | 0) == (-1 | 0)) {
                          break label$4;
                        }
                        if (($0_1 | 0) == (-1 | 0)) {
                          break label$4;
                        }
                        if ($5_1 >>> 0 >= $0_1 >>> 0) {
                          break label$4;
                        }
                        $2_1 = $0_1 - $5_1 | 0;
                        if ($2_1 >>> 0 <= ($3_1 + 40 | 0) >>> 0) {
                          break label$4;
                        }
                      }
                      $0_1 = (HEAP322[(0 + 1464 | 0) >> 2] | 0) + $2_1 | 0;
                      HEAP322[(0 + 1464 | 0) >> 2] = $0_1;
                      label$58: {
                        if ($0_1 >>> 0 <= (HEAP322[(0 + 1468 | 0) >> 2] | 0) >>> 0) {
                          break label$58;
                        }
                        HEAP322[(0 + 1468 | 0) >> 2] = $0_1;
                      }
                      label$59: {
                        label$60: {
                          label$61: {
                            label$62: {
                              $4_1 = HEAP322[(0 + 1056 | 0) >> 2] | 0;
                              if (!$4_1) {
                                break label$62;
                              }
                              $0_1 = 1480;
                              label$63: while (1) {
                                $6_1 = HEAP322[$0_1 >> 2] | 0;
                                $8_1 = HEAP322[($0_1 + 4 | 0) >> 2] | 0;
                                if (($5_1 | 0) == ($6_1 + $8_1 | 0 | 0)) {
                                  break label$61;
                                }
                                $0_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                                if ($0_1) {
                                  continue label$63;
                                }
                                break label$60;
                              }
                              ;
                            }
                            label$64: {
                              label$65: {
                                $0_1 = HEAP322[(0 + 1048 | 0) >> 2] | 0;
                                if (!$0_1) {
                                  break label$65;
                                }
                                if ($5_1 >>> 0 >= $0_1 >>> 0) {
                                  break label$64;
                                }
                              }
                              HEAP322[(0 + 1048 | 0) >> 2] = $5_1;
                            }
                            $0_1 = 0;
                            HEAP322[(0 + 1484 | 0) >> 2] = $2_1;
                            HEAP322[(0 + 1480 | 0) >> 2] = $5_1;
                            HEAP322[(0 + 1064 | 0) >> 2] = -1;
                            HEAP322[(0 + 1068 | 0) >> 2] = HEAP322[(0 + 1504 | 0) >> 2] | 0;
                            HEAP322[(0 + 1492 | 0) >> 2] = 0;
                            label$66: while (1) {
                              $4_1 = $0_1 << 3 | 0;
                              $6_1 = $4_1 + 1072 | 0;
                              HEAP322[($4_1 + 1080 | 0) >> 2] = $6_1;
                              HEAP322[($4_1 + 1084 | 0) >> 2] = $6_1;
                              $0_1 = $0_1 + 1 | 0;
                              if (($0_1 | 0) != (32 | 0)) {
                                continue label$66;
                              }
                              break label$66;
                            }
                            ;
                            $0_1 = $2_1 + -40 | 0;
                            $4_1 = ($5_1 + 8 | 0) & 7 | 0 ? (-8 - $5_1 | 0) & 7 | 0 : 0;
                            $6_1 = $0_1 - $4_1 | 0;
                            HEAP322[(0 + 1044 | 0) >> 2] = $6_1;
                            $4_1 = $5_1 + $4_1 | 0;
                            HEAP322[(0 + 1056 | 0) >> 2] = $4_1;
                            HEAP322[($4_1 + 4 | 0) >> 2] = $6_1 | 1 | 0;
                            HEAP322[(($5_1 + $0_1 | 0) + 4 | 0) >> 2] = 40;
                            HEAP322[(0 + 1060 | 0) >> 2] = HEAP322[(0 + 1520 | 0) >> 2] | 0;
                            break label$59;
                          }
                          if ((HEAPU82[($0_1 + 12 | 0) >> 0] | 0) & 8 | 0) {
                            break label$60;
                          }
                          if ($6_1 >>> 0 > $4_1 >>> 0) {
                            break label$60;
                          }
                          if ($5_1 >>> 0 <= $4_1 >>> 0) {
                            break label$60;
                          }
                          HEAP322[($0_1 + 4 | 0) >> 2] = $8_1 + $2_1 | 0;
                          $0_1 = ($4_1 + 8 | 0) & 7 | 0 ? (-8 - $4_1 | 0) & 7 | 0 : 0;
                          $6_1 = $4_1 + $0_1 | 0;
                          HEAP322[(0 + 1056 | 0) >> 2] = $6_1;
                          $5_1 = (HEAP322[(0 + 1044 | 0) >> 2] | 0) + $2_1 | 0;
                          $0_1 = $5_1 - $0_1 | 0;
                          HEAP322[(0 + 1044 | 0) >> 2] = $0_1;
                          HEAP322[($6_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                          HEAP322[(($4_1 + $5_1 | 0) + 4 | 0) >> 2] = 40;
                          HEAP322[(0 + 1060 | 0) >> 2] = HEAP322[(0 + 1520 | 0) >> 2] | 0;
                          break label$59;
                        }
                        label$67: {
                          $8_1 = HEAP322[(0 + 1048 | 0) >> 2] | 0;
                          if ($5_1 >>> 0 >= $8_1 >>> 0) {
                            break label$67;
                          }
                          HEAP322[(0 + 1048 | 0) >> 2] = $5_1;
                          $8_1 = $5_1;
                        }
                        $6_1 = $5_1 + $2_1 | 0;
                        $0_1 = 1480;
                        label$68: {
                          label$69: {
                            label$70: {
                              label$71: {
                                label$72: {
                                  label$73: {
                                    label$74: {
                                      label$75: while (1) {
                                        if ((HEAP322[$0_1 >> 2] | 0 | 0) == ($6_1 | 0)) {
                                          break label$74;
                                        }
                                        $0_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                                        if ($0_1) {
                                          continue label$75;
                                        }
                                        break label$73;
                                      }
                                      ;
                                    }
                                    if (!((HEAPU82[($0_1 + 12 | 0) >> 0] | 0) & 8 | 0)) {
                                      break label$72;
                                    }
                                  }
                                  $0_1 = 1480;
                                  label$76: while (1) {
                                    label$77: {
                                      $6_1 = HEAP322[$0_1 >> 2] | 0;
                                      if ($6_1 >>> 0 > $4_1 >>> 0) {
                                        break label$77;
                                      }
                                      $6_1 = $6_1 + (HEAP322[($0_1 + 4 | 0) >> 2] | 0) | 0;
                                      if ($6_1 >>> 0 > $4_1 >>> 0) {
                                        break label$71;
                                      }
                                    }
                                    $0_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                                    continue label$76;
                                  }
                                  ;
                                }
                                HEAP322[$0_1 >> 2] = $5_1;
                                HEAP322[($0_1 + 4 | 0) >> 2] = (HEAP322[($0_1 + 4 | 0) >> 2] | 0) + $2_1 | 0;
                                $11_1 = $5_1 + (($5_1 + 8 | 0) & 7 | 0 ? (-8 - $5_1 | 0) & 7 | 0 : 0) | 0;
                                HEAP322[($11_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                                $2_1 = $6_1 + (($6_1 + 8 | 0) & 7 | 0 ? (-8 - $6_1 | 0) & 7 | 0 : 0) | 0;
                                $6_1 = $11_1 + $3_1 | 0;
                                $3_1 = $2_1 - $6_1 | 0;
                                label$78: {
                                  if (($4_1 | 0) != ($2_1 | 0)) {
                                    break label$78;
                                  }
                                  HEAP322[(0 + 1056 | 0) >> 2] = $6_1;
                                  $0_1 = (HEAP322[(0 + 1044 | 0) >> 2] | 0) + $3_1 | 0;
                                  HEAP322[(0 + 1044 | 0) >> 2] = $0_1;
                                  HEAP322[($6_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                                  break label$69;
                                }
                                label$79: {
                                  if ((HEAP322[(0 + 1052 | 0) >> 2] | 0 | 0) != ($2_1 | 0)) {
                                    break label$79;
                                  }
                                  HEAP322[(0 + 1052 | 0) >> 2] = $6_1;
                                  $0_1 = (HEAP322[(0 + 1040 | 0) >> 2] | 0) + $3_1 | 0;
                                  HEAP322[(0 + 1040 | 0) >> 2] = $0_1;
                                  HEAP322[($6_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                                  HEAP322[($6_1 + $0_1 | 0) >> 2] = $0_1;
                                  break label$69;
                                }
                                label$80: {
                                  $0_1 = HEAP322[($2_1 + 4 | 0) >> 2] | 0;
                                  if (($0_1 & 3 | 0 | 0) != (1 | 0)) {
                                    break label$80;
                                  }
                                  $7_1 = $0_1 & -8 | 0;
                                  label$81: {
                                    label$82: {
                                      if ($0_1 >>> 0 > 255 >>> 0) {
                                        break label$82;
                                      }
                                      $4_1 = HEAP322[($2_1 + 8 | 0) >> 2] | 0;
                                      $8_1 = $0_1 >>> 3 | 0;
                                      $5_1 = ($8_1 << 3 | 0) + 1072 | 0;
                                      label$83: {
                                        $0_1 = HEAP322[($2_1 + 12 | 0) >> 2] | 0;
                                        if (($0_1 | 0) != ($4_1 | 0)) {
                                          break label$83;
                                        }
                                        HEAP322[(0 + 1032 | 0) >> 2] = (HEAP322[(0 + 1032 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, $8_1 | 0) | 0) | 0;
                                        break label$81;
                                      }
                                      HEAP322[($4_1 + 12 | 0) >> 2] = $0_1;
                                      HEAP322[($0_1 + 8 | 0) >> 2] = $4_1;
                                      break label$81;
                                    }
                                    $9_1 = HEAP322[($2_1 + 24 | 0) >> 2] | 0;
                                    label$84: {
                                      label$85: {
                                        $5_1 = HEAP322[($2_1 + 12 | 0) >> 2] | 0;
                                        if (($5_1 | 0) == ($2_1 | 0)) {
                                          break label$85;
                                        }
                                        $0_1 = HEAP322[($2_1 + 8 | 0) >> 2] | 0;
                                        HEAP322[($0_1 + 12 | 0) >> 2] = $5_1;
                                        HEAP322[($5_1 + 8 | 0) >> 2] = $0_1;
                                        break label$84;
                                      }
                                      label$86: {
                                        $0_1 = $2_1 + 20 | 0;
                                        $4_1 = HEAP322[$0_1 >> 2] | 0;
                                        if ($4_1) {
                                          break label$86;
                                        }
                                        $0_1 = $2_1 + 16 | 0;
                                        $4_1 = HEAP322[$0_1 >> 2] | 0;
                                        if ($4_1) {
                                          break label$86;
                                        }
                                        $5_1 = 0;
                                        break label$84;
                                      }
                                      label$87: while (1) {
                                        $8_1 = $0_1;
                                        $5_1 = $4_1;
                                        $0_1 = $4_1 + 20 | 0;
                                        $4_1 = HEAP322[$0_1 >> 2] | 0;
                                        if ($4_1) {
                                          continue label$87;
                                        }
                                        $0_1 = $5_1 + 16 | 0;
                                        $4_1 = HEAP322[($5_1 + 16 | 0) >> 2] | 0;
                                        if ($4_1) {
                                          continue label$87;
                                        }
                                        break label$87;
                                      }
                                      ;
                                      HEAP322[$8_1 >> 2] = 0;
                                    }
                                    if (!$9_1) {
                                      break label$81;
                                    }
                                    label$88: {
                                      label$89: {
                                        $4_1 = HEAP322[($2_1 + 28 | 0) >> 2] | 0;
                                        $0_1 = ($4_1 << 2 | 0) + 1336 | 0;
                                        if ((HEAP322[$0_1 >> 2] | 0 | 0) != ($2_1 | 0)) {
                                          break label$89;
                                        }
                                        HEAP322[$0_1 >> 2] = $5_1;
                                        if ($5_1) {
                                          break label$88;
                                        }
                                        HEAP322[(0 + 1036 | 0) >> 2] = (HEAP322[(0 + 1036 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, $4_1 | 0) | 0) | 0;
                                        break label$81;
                                      }
                                      HEAP322[($9_1 + ((HEAP322[($9_1 + 16 | 0) >> 2] | 0 | 0) == ($2_1 | 0) ? 16 : 20) | 0) >> 2] = $5_1;
                                      if (!$5_1) {
                                        break label$81;
                                      }
                                    }
                                    HEAP322[($5_1 + 24 | 0) >> 2] = $9_1;
                                    label$90: {
                                      $0_1 = HEAP322[($2_1 + 16 | 0) >> 2] | 0;
                                      if (!$0_1) {
                                        break label$90;
                                      }
                                      HEAP322[($5_1 + 16 | 0) >> 2] = $0_1;
                                      HEAP322[($0_1 + 24 | 0) >> 2] = $5_1;
                                    }
                                    $0_1 = HEAP322[($2_1 + 20 | 0) >> 2] | 0;
                                    if (!$0_1) {
                                      break label$81;
                                    }
                                    HEAP322[($5_1 + 20 | 0) >> 2] = $0_1;
                                    HEAP322[($0_1 + 24 | 0) >> 2] = $5_1;
                                  }
                                  $3_1 = $7_1 + $3_1 | 0;
                                  $2_1 = $2_1 + $7_1 | 0;
                                }
                                HEAP322[($2_1 + 4 | 0) >> 2] = (HEAP322[($2_1 + 4 | 0) >> 2] | 0) & -2 | 0;
                                HEAP322[($6_1 + 4 | 0) >> 2] = $3_1 | 1 | 0;
                                HEAP322[($6_1 + $3_1 | 0) >> 2] = $3_1;
                                label$91: {
                                  if ($3_1 >>> 0 > 255 >>> 0) {
                                    break label$91;
                                  }
                                  $4_1 = $3_1 >>> 3 | 0;
                                  $0_1 = ($4_1 << 3 | 0) + 1072 | 0;
                                  label$92: {
                                    label$93: {
                                      $3_1 = HEAP322[(0 + 1032 | 0) >> 2] | 0;
                                      $4_1 = 1 << $4_1 | 0;
                                      if ($3_1 & $4_1 | 0) {
                                        break label$93;
                                      }
                                      HEAP322[(0 + 1032 | 0) >> 2] = $3_1 | $4_1 | 0;
                                      $4_1 = $0_1;
                                      break label$92;
                                    }
                                    $4_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                                  }
                                  HEAP322[($0_1 + 8 | 0) >> 2] = $6_1;
                                  HEAP322[($4_1 + 12 | 0) >> 2] = $6_1;
                                  HEAP322[($6_1 + 12 | 0) >> 2] = $0_1;
                                  HEAP322[($6_1 + 8 | 0) >> 2] = $4_1;
                                  break label$69;
                                }
                                $0_1 = 31;
                                label$94: {
                                  if ($3_1 >>> 0 > 16777215 >>> 0) {
                                    break label$94;
                                  }
                                  $0_1 = $3_1 >>> 8 | 0;
                                  $1160 = $0_1;
                                  $0_1 = (($0_1 + 1048320 | 0) >>> 16 | 0) & 8 | 0;
                                  $4_1 = $1160 << $0_1 | 0;
                                  $1167 = $4_1;
                                  $4_1 = (($4_1 + 520192 | 0) >>> 16 | 0) & 4 | 0;
                                  $5_1 = $1167 << $4_1 | 0;
                                  $1174 = $5_1;
                                  $5_1 = (($5_1 + 245760 | 0) >>> 16 | 0) & 2 | 0;
                                  $0_1 = (($1174 << $5_1 | 0) >>> 15 | 0) - ($0_1 | $4_1 | 0 | $5_1 | 0) | 0;
                                  $0_1 = ($0_1 << 1 | 0 | (($3_1 >>> ($0_1 + 21 | 0) | 0) & 1 | 0) | 0) + 28 | 0;
                                }
                                HEAP322[($6_1 + 28 | 0) >> 2] = $0_1;
                                i64toi32_i32$1 = $6_1;
                                i64toi32_i32$0 = 0;
                                HEAP322[($6_1 + 16 | 0) >> 2] = 0;
                                HEAP322[($6_1 + 20 | 0) >> 2] = i64toi32_i32$0;
                                $4_1 = ($0_1 << 2 | 0) + 1336 | 0;
                                label$95: {
                                  label$96: {
                                    $5_1 = HEAP322[(0 + 1036 | 0) >> 2] | 0;
                                    $8_1 = 1 << $0_1 | 0;
                                    if ($5_1 & $8_1 | 0) {
                                      break label$96;
                                    }
                                    HEAP322[(0 + 1036 | 0) >> 2] = $5_1 | $8_1 | 0;
                                    HEAP322[$4_1 >> 2] = $6_1;
                                    HEAP322[($6_1 + 24 | 0) >> 2] = $4_1;
                                    break label$95;
                                  }
                                  $0_1 = $3_1 << (($0_1 | 0) == (31 | 0) ? 0 : 25 - ($0_1 >>> 1 | 0) | 0) | 0;
                                  $5_1 = HEAP322[$4_1 >> 2] | 0;
                                  label$97: while (1) {
                                    $4_1 = $5_1;
                                    if (((HEAP322[($4_1 + 4 | 0) >> 2] | 0) & -8 | 0 | 0) == ($3_1 | 0)) {
                                      break label$70;
                                    }
                                    $5_1 = $0_1 >>> 29 | 0;
                                    $0_1 = $0_1 << 1 | 0;
                                    $8_1 = ($4_1 + ($5_1 & 4 | 0) | 0) + 16 | 0;
                                    $5_1 = HEAP322[$8_1 >> 2] | 0;
                                    if ($5_1) {
                                      continue label$97;
                                    }
                                    break label$97;
                                  }
                                  ;
                                  HEAP322[$8_1 >> 2] = $6_1;
                                  HEAP322[($6_1 + 24 | 0) >> 2] = $4_1;
                                }
                                HEAP322[($6_1 + 12 | 0) >> 2] = $6_1;
                                HEAP322[($6_1 + 8 | 0) >> 2] = $6_1;
                                break label$69;
                              }
                              $0_1 = $2_1 + -40 | 0;
                              $8_1 = ($5_1 + 8 | 0) & 7 | 0 ? (-8 - $5_1 | 0) & 7 | 0 : 0;
                              $11_1 = $0_1 - $8_1 | 0;
                              HEAP322[(0 + 1044 | 0) >> 2] = $11_1;
                              $8_1 = $5_1 + $8_1 | 0;
                              HEAP322[(0 + 1056 | 0) >> 2] = $8_1;
                              HEAP322[($8_1 + 4 | 0) >> 2] = $11_1 | 1 | 0;
                              HEAP322[(($5_1 + $0_1 | 0) + 4 | 0) >> 2] = 40;
                              HEAP322[(0 + 1060 | 0) >> 2] = HEAP322[(0 + 1520 | 0) >> 2] | 0;
                              $0_1 = ($6_1 + (($6_1 + -39 | 0) & 7 | 0 ? (39 - $6_1 | 0) & 7 | 0 : 0) | 0) + -47 | 0;
                              $8_1 = $0_1 >>> 0 < ($4_1 + 16 | 0) >>> 0 ? $4_1 : $0_1;
                              HEAP322[($8_1 + 4 | 0) >> 2] = 27;
                              i64toi32_i32$2 = 0;
                              i64toi32_i32$0 = HEAP322[(i64toi32_i32$2 + 1488 | 0) >> 2] | 0;
                              i64toi32_i32$1 = HEAP322[(i64toi32_i32$2 + 1492 | 0) >> 2] | 0;
                              $1296 = i64toi32_i32$0;
                              i64toi32_i32$0 = $8_1 + 16 | 0;
                              HEAP322[i64toi32_i32$0 >> 2] = $1296;
                              HEAP322[(i64toi32_i32$0 + 4 | 0) >> 2] = i64toi32_i32$1;
                              i64toi32_i32$2 = 0;
                              i64toi32_i32$1 = HEAP322[(i64toi32_i32$2 + 1480 | 0) >> 2] | 0;
                              i64toi32_i32$0 = HEAP322[(i64toi32_i32$2 + 1484 | 0) >> 2] | 0;
                              $1298 = i64toi32_i32$1;
                              i64toi32_i32$1 = $8_1;
                              HEAP322[($8_1 + 8 | 0) >> 2] = $1298;
                              HEAP322[($8_1 + 12 | 0) >> 2] = i64toi32_i32$0;
                              HEAP322[(0 + 1488 | 0) >> 2] = $8_1 + 8 | 0;
                              HEAP322[(0 + 1484 | 0) >> 2] = $2_1;
                              HEAP322[(0 + 1480 | 0) >> 2] = $5_1;
                              HEAP322[(0 + 1492 | 0) >> 2] = 0;
                              $0_1 = $8_1 + 24 | 0;
                              label$98: while (1) {
                                HEAP322[($0_1 + 4 | 0) >> 2] = 7;
                                $5_1 = $0_1 + 8 | 0;
                                $0_1 = $0_1 + 4 | 0;
                                if ($6_1 >>> 0 > $5_1 >>> 0) {
                                  continue label$98;
                                }
                                break label$98;
                              }
                              ;
                              if (($8_1 | 0) == ($4_1 | 0)) {
                                break label$59;
                              }
                              HEAP322[($8_1 + 4 | 0) >> 2] = (HEAP322[($8_1 + 4 | 0) >> 2] | 0) & -2 | 0;
                              $2_1 = $8_1 - $4_1 | 0;
                              HEAP322[($4_1 + 4 | 0) >> 2] = $2_1 | 1 | 0;
                              HEAP322[$8_1 >> 2] = $2_1;
                              label$99: {
                                if ($2_1 >>> 0 > 255 >>> 0) {
                                  break label$99;
                                }
                                $6_1 = $2_1 >>> 3 | 0;
                                $0_1 = ($6_1 << 3 | 0) + 1072 | 0;
                                label$100: {
                                  label$101: {
                                    $5_1 = HEAP322[(0 + 1032 | 0) >> 2] | 0;
                                    $6_1 = 1 << $6_1 | 0;
                                    if ($5_1 & $6_1 | 0) {
                                      break label$101;
                                    }
                                    HEAP322[(0 + 1032 | 0) >> 2] = $5_1 | $6_1 | 0;
                                    $6_1 = $0_1;
                                    break label$100;
                                  }
                                  $6_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                                }
                                HEAP322[($0_1 + 8 | 0) >> 2] = $4_1;
                                HEAP322[($6_1 + 12 | 0) >> 2] = $4_1;
                                HEAP322[($4_1 + 12 | 0) >> 2] = $0_1;
                                HEAP322[($4_1 + 8 | 0) >> 2] = $6_1;
                                break label$59;
                              }
                              $0_1 = 31;
                              label$102: {
                                if ($2_1 >>> 0 > 16777215 >>> 0) {
                                  break label$102;
                                }
                                $0_1 = $2_1 >>> 8 | 0;
                                $1359 = $0_1;
                                $0_1 = (($0_1 + 1048320 | 0) >>> 16 | 0) & 8 | 0;
                                $6_1 = $1359 << $0_1 | 0;
                                $1366 = $6_1;
                                $6_1 = (($6_1 + 520192 | 0) >>> 16 | 0) & 4 | 0;
                                $5_1 = $1366 << $6_1 | 0;
                                $1373 = $5_1;
                                $5_1 = (($5_1 + 245760 | 0) >>> 16 | 0) & 2 | 0;
                                $0_1 = (($1373 << $5_1 | 0) >>> 15 | 0) - ($0_1 | $6_1 | 0 | $5_1 | 0) | 0;
                                $0_1 = ($0_1 << 1 | 0 | (($2_1 >>> ($0_1 + 21 | 0) | 0) & 1 | 0) | 0) + 28 | 0;
                              }
                              i64toi32_i32$1 = $4_1;
                              i64toi32_i32$0 = 0;
                              HEAP322[($4_1 + 16 | 0) >> 2] = 0;
                              HEAP322[($4_1 + 20 | 0) >> 2] = i64toi32_i32$0;
                              HEAP322[($4_1 + 28 | 0) >> 2] = $0_1;
                              $6_1 = ($0_1 << 2 | 0) + 1336 | 0;
                              label$103: {
                                label$104: {
                                  $5_1 = HEAP322[(0 + 1036 | 0) >> 2] | 0;
                                  $8_1 = 1 << $0_1 | 0;
                                  if ($5_1 & $8_1 | 0) {
                                    break label$104;
                                  }
                                  HEAP322[(0 + 1036 | 0) >> 2] = $5_1 | $8_1 | 0;
                                  HEAP322[$6_1 >> 2] = $4_1;
                                  HEAP322[($4_1 + 24 | 0) >> 2] = $6_1;
                                  break label$103;
                                }
                                $0_1 = $2_1 << (($0_1 | 0) == (31 | 0) ? 0 : 25 - ($0_1 >>> 1 | 0) | 0) | 0;
                                $5_1 = HEAP322[$6_1 >> 2] | 0;
                                label$105: while (1) {
                                  $6_1 = $5_1;
                                  if (((HEAP322[($5_1 + 4 | 0) >> 2] | 0) & -8 | 0 | 0) == ($2_1 | 0)) {
                                    break label$68;
                                  }
                                  $5_1 = $0_1 >>> 29 | 0;
                                  $0_1 = $0_1 << 1 | 0;
                                  $8_1 = ($6_1 + ($5_1 & 4 | 0) | 0) + 16 | 0;
                                  $5_1 = HEAP322[$8_1 >> 2] | 0;
                                  if ($5_1) {
                                    continue label$105;
                                  }
                                  break label$105;
                                }
                                ;
                                HEAP322[$8_1 >> 2] = $4_1;
                                HEAP322[($4_1 + 24 | 0) >> 2] = $6_1;
                              }
                              HEAP322[($4_1 + 12 | 0) >> 2] = $4_1;
                              HEAP322[($4_1 + 8 | 0) >> 2] = $4_1;
                              break label$59;
                            }
                            $0_1 = HEAP322[($4_1 + 8 | 0) >> 2] | 0;
                            HEAP322[($0_1 + 12 | 0) >> 2] = $6_1;
                            HEAP322[($4_1 + 8 | 0) >> 2] = $6_1;
                            HEAP322[($6_1 + 24 | 0) >> 2] = 0;
                            HEAP322[($6_1 + 12 | 0) >> 2] = $4_1;
                            HEAP322[($6_1 + 8 | 0) >> 2] = $0_1;
                          }
                          $0_1 = $11_1 + 8 | 0;
                          break label$1;
                        }
                        $0_1 = HEAP322[($6_1 + 8 | 0) >> 2] | 0;
                        HEAP322[($0_1 + 12 | 0) >> 2] = $4_1;
                        HEAP322[($6_1 + 8 | 0) >> 2] = $4_1;
                        HEAP322[($4_1 + 24 | 0) >> 2] = 0;
                        HEAP322[($4_1 + 12 | 0) >> 2] = $6_1;
                        HEAP322[($4_1 + 8 | 0) >> 2] = $0_1;
                      }
                      $0_1 = HEAP322[(0 + 1044 | 0) >> 2] | 0;
                      if ($0_1 >>> 0 <= $3_1 >>> 0) {
                        break label$4;
                      }
                      $4_1 = $0_1 - $3_1 | 0;
                      HEAP322[(0 + 1044 | 0) >> 2] = $4_1;
                      $0_1 = HEAP322[(0 + 1056 | 0) >> 2] | 0;
                      $6_1 = $0_1 + $3_1 | 0;
                      HEAP322[(0 + 1056 | 0) >> 2] = $6_1;
                      HEAP322[($6_1 + 4 | 0) >> 2] = $4_1 | 1 | 0;
                      HEAP322[($0_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                      $0_1 = $0_1 + 8 | 0;
                      break label$1;
                    }
                    HEAP322[($29() | 0) >> 2] = 48;
                    $0_1 = 0;
                    break label$1;
                  }
                  label$106: {
                    if (!$11_1) {
                      break label$106;
                    }
                    label$107: {
                      label$108: {
                        $6_1 = HEAP322[($8_1 + 28 | 0) >> 2] | 0;
                        $0_1 = ($6_1 << 2 | 0) + 1336 | 0;
                        if (($8_1 | 0) != (HEAP322[$0_1 >> 2] | 0 | 0)) {
                          break label$108;
                        }
                        HEAP322[$0_1 >> 2] = $5_1;
                        if ($5_1) {
                          break label$107;
                        }
                        $9_1 = $9_1 & (__wasm_rotl_i32(-2 | 0, $6_1 | 0) | 0) | 0;
                        HEAP322[(0 + 1036 | 0) >> 2] = $9_1;
                        break label$106;
                      }
                      HEAP322[($11_1 + ((HEAP322[($11_1 + 16 | 0) >> 2] | 0 | 0) == ($8_1 | 0) ? 16 : 20) | 0) >> 2] = $5_1;
                      if (!$5_1) {
                        break label$106;
                      }
                    }
                    HEAP322[($5_1 + 24 | 0) >> 2] = $11_1;
                    label$109: {
                      $0_1 = HEAP322[($8_1 + 16 | 0) >> 2] | 0;
                      if (!$0_1) {
                        break label$109;
                      }
                      HEAP322[($5_1 + 16 | 0) >> 2] = $0_1;
                      HEAP322[($0_1 + 24 | 0) >> 2] = $5_1;
                    }
                    $0_1 = HEAP322[($8_1 + 20 | 0) >> 2] | 0;
                    if (!$0_1) {
                      break label$106;
                    }
                    HEAP322[($5_1 + 20 | 0) >> 2] = $0_1;
                    HEAP322[($0_1 + 24 | 0) >> 2] = $5_1;
                  }
                  label$110: {
                    label$111: {
                      if ($4_1 >>> 0 > 15 >>> 0) {
                        break label$111;
                      }
                      $0_1 = $4_1 + $3_1 | 0;
                      HEAP322[($8_1 + 4 | 0) >> 2] = $0_1 | 3 | 0;
                      $0_1 = $8_1 + $0_1 | 0;
                      HEAP322[($0_1 + 4 | 0) >> 2] = HEAP322[($0_1 + 4 | 0) >> 2] | 0 | 1 | 0;
                      break label$110;
                    }
                    HEAP322[($8_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                    $5_1 = $8_1 + $3_1 | 0;
                    HEAP322[($5_1 + 4 | 0) >> 2] = $4_1 | 1 | 0;
                    HEAP322[($5_1 + $4_1 | 0) >> 2] = $4_1;
                    label$112: {
                      if ($4_1 >>> 0 > 255 >>> 0) {
                        break label$112;
                      }
                      $4_1 = $4_1 >>> 3 | 0;
                      $0_1 = ($4_1 << 3 | 0) + 1072 | 0;
                      label$113: {
                        label$114: {
                          $3_1 = HEAP322[(0 + 1032 | 0) >> 2] | 0;
                          $4_1 = 1 << $4_1 | 0;
                          if ($3_1 & $4_1 | 0) {
                            break label$114;
                          }
                          HEAP322[(0 + 1032 | 0) >> 2] = $3_1 | $4_1 | 0;
                          $4_1 = $0_1;
                          break label$113;
                        }
                        $4_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                      }
                      HEAP322[($0_1 + 8 | 0) >> 2] = $5_1;
                      HEAP322[($4_1 + 12 | 0) >> 2] = $5_1;
                      HEAP322[($5_1 + 12 | 0) >> 2] = $0_1;
                      HEAP322[($5_1 + 8 | 0) >> 2] = $4_1;
                      break label$110;
                    }
                    $0_1 = 31;
                    label$115: {
                      if ($4_1 >>> 0 > 16777215 >>> 0) {
                        break label$115;
                      }
                      $0_1 = $4_1 >>> 8 | 0;
                      $1609 = $0_1;
                      $0_1 = (($0_1 + 1048320 | 0) >>> 16 | 0) & 8 | 0;
                      $3_1 = $1609 << $0_1 | 0;
                      $1616 = $3_1;
                      $3_1 = (($3_1 + 520192 | 0) >>> 16 | 0) & 4 | 0;
                      $6_1 = $1616 << $3_1 | 0;
                      $1623 = $6_1;
                      $6_1 = (($6_1 + 245760 | 0) >>> 16 | 0) & 2 | 0;
                      $0_1 = (($1623 << $6_1 | 0) >>> 15 | 0) - ($0_1 | $3_1 | 0 | $6_1 | 0) | 0;
                      $0_1 = ($0_1 << 1 | 0 | (($4_1 >>> ($0_1 + 21 | 0) | 0) & 1 | 0) | 0) + 28 | 0;
                    }
                    HEAP322[($5_1 + 28 | 0) >> 2] = $0_1;
                    i64toi32_i32$1 = $5_1;
                    i64toi32_i32$0 = 0;
                    HEAP322[($5_1 + 16 | 0) >> 2] = 0;
                    HEAP322[($5_1 + 20 | 0) >> 2] = i64toi32_i32$0;
                    $3_1 = ($0_1 << 2 | 0) + 1336 | 0;
                    label$116: {
                      label$117: {
                        label$118: {
                          $6_1 = 1 << $0_1 | 0;
                          if ($9_1 & $6_1 | 0) {
                            break label$118;
                          }
                          HEAP322[(0 + 1036 | 0) >> 2] = $9_1 | $6_1 | 0;
                          HEAP322[$3_1 >> 2] = $5_1;
                          HEAP322[($5_1 + 24 | 0) >> 2] = $3_1;
                          break label$117;
                        }
                        $0_1 = $4_1 << (($0_1 | 0) == (31 | 0) ? 0 : 25 - ($0_1 >>> 1 | 0) | 0) | 0;
                        $6_1 = HEAP322[$3_1 >> 2] | 0;
                        label$119: while (1) {
                          $3_1 = $6_1;
                          if (((HEAP322[($6_1 + 4 | 0) >> 2] | 0) & -8 | 0 | 0) == ($4_1 | 0)) {
                            break label$116;
                          }
                          $6_1 = $0_1 >>> 29 | 0;
                          $0_1 = $0_1 << 1 | 0;
                          $2_1 = ($3_1 + ($6_1 & 4 | 0) | 0) + 16 | 0;
                          $6_1 = HEAP322[$2_1 >> 2] | 0;
                          if ($6_1) {
                            continue label$119;
                          }
                          break label$119;
                        }
                        ;
                        HEAP322[$2_1 >> 2] = $5_1;
                        HEAP322[($5_1 + 24 | 0) >> 2] = $3_1;
                      }
                      HEAP322[($5_1 + 12 | 0) >> 2] = $5_1;
                      HEAP322[($5_1 + 8 | 0) >> 2] = $5_1;
                      break label$110;
                    }
                    $0_1 = HEAP322[($3_1 + 8 | 0) >> 2] | 0;
                    HEAP322[($0_1 + 12 | 0) >> 2] = $5_1;
                    HEAP322[($3_1 + 8 | 0) >> 2] = $5_1;
                    HEAP322[($5_1 + 24 | 0) >> 2] = 0;
                    HEAP322[($5_1 + 12 | 0) >> 2] = $3_1;
                    HEAP322[($5_1 + 8 | 0) >> 2] = $0_1;
                  }
                  $0_1 = $8_1 + 8 | 0;
                  break label$1;
                }
                label$120: {
                  if (!$10_1) {
                    break label$120;
                  }
                  label$121: {
                    label$122: {
                      $6_1 = HEAP322[($5_1 + 28 | 0) >> 2] | 0;
                      $0_1 = ($6_1 << 2 | 0) + 1336 | 0;
                      if (($5_1 | 0) != (HEAP322[$0_1 >> 2] | 0 | 0)) {
                        break label$122;
                      }
                      HEAP322[$0_1 >> 2] = $8_1;
                      if ($8_1) {
                        break label$121;
                      }
                      HEAP322[(0 + 1036 | 0) >> 2] = $9_1 & (__wasm_rotl_i32(-2 | 0, $6_1 | 0) | 0) | 0;
                      break label$120;
                    }
                    HEAP322[($10_1 + ((HEAP322[($10_1 + 16 | 0) >> 2] | 0 | 0) == ($5_1 | 0) ? 16 : 20) | 0) >> 2] = $8_1;
                    if (!$8_1) {
                      break label$120;
                    }
                  }
                  HEAP322[($8_1 + 24 | 0) >> 2] = $10_1;
                  label$123: {
                    $0_1 = HEAP322[($5_1 + 16 | 0) >> 2] | 0;
                    if (!$0_1) {
                      break label$123;
                    }
                    HEAP322[($8_1 + 16 | 0) >> 2] = $0_1;
                    HEAP322[($0_1 + 24 | 0) >> 2] = $8_1;
                  }
                  $0_1 = HEAP322[($5_1 + 20 | 0) >> 2] | 0;
                  if (!$0_1) {
                    break label$120;
                  }
                  HEAP322[($8_1 + 20 | 0) >> 2] = $0_1;
                  HEAP322[($0_1 + 24 | 0) >> 2] = $8_1;
                }
                label$124: {
                  label$125: {
                    if ($4_1 >>> 0 > 15 >>> 0) {
                      break label$125;
                    }
                    $0_1 = $4_1 + $3_1 | 0;
                    HEAP322[($5_1 + 4 | 0) >> 2] = $0_1 | 3 | 0;
                    $0_1 = $5_1 + $0_1 | 0;
                    HEAP322[($0_1 + 4 | 0) >> 2] = HEAP322[($0_1 + 4 | 0) >> 2] | 0 | 1 | 0;
                    break label$124;
                  }
                  HEAP322[($5_1 + 4 | 0) >> 2] = $3_1 | 3 | 0;
                  $3_1 = $5_1 + $3_1 | 0;
                  HEAP322[($3_1 + 4 | 0) >> 2] = $4_1 | 1 | 0;
                  HEAP322[($3_1 + $4_1 | 0) >> 2] = $4_1;
                  label$126: {
                    if (!$7_1) {
                      break label$126;
                    }
                    $8_1 = $7_1 >>> 3 | 0;
                    $6_1 = ($8_1 << 3 | 0) + 1072 | 0;
                    $0_1 = HEAP322[(0 + 1052 | 0) >> 2] | 0;
                    label$127: {
                      label$128: {
                        $8_1 = 1 << $8_1 | 0;
                        if ($8_1 & $2_1 | 0) {
                          break label$128;
                        }
                        HEAP322[(0 + 1032 | 0) >> 2] = $8_1 | $2_1 | 0;
                        $8_1 = $6_1;
                        break label$127;
                      }
                      $8_1 = HEAP322[($6_1 + 8 | 0) >> 2] | 0;
                    }
                    HEAP322[($6_1 + 8 | 0) >> 2] = $0_1;
                    HEAP322[($8_1 + 12 | 0) >> 2] = $0_1;
                    HEAP322[($0_1 + 12 | 0) >> 2] = $6_1;
                    HEAP322[($0_1 + 8 | 0) >> 2] = $8_1;
                  }
                  HEAP322[(0 + 1052 | 0) >> 2] = $3_1;
                  HEAP322[(0 + 1040 | 0) >> 2] = $4_1;
                }
                $0_1 = $5_1 + 8 | 0;
              }
              global$0 = $1_1 + 16 | 0;
              return $0_1 | 0;
            }
            function $32($0_1) {
              $0_1 = $0_1 | 0;
              var $2_1 = 0, $6_1 = 0, $1_1 = 0, $4_1 = 0, $3_1 = 0, $5_1 = 0, $7_1 = 0, $379 = 0, $386 = 0, $393 = 0;
              label$1: {
                if (!$0_1) {
                  break label$1;
                }
                $1_1 = $0_1 + -8 | 0;
                $2_1 = HEAP322[($0_1 + -4 | 0) >> 2] | 0;
                $0_1 = $2_1 & -8 | 0;
                $3_1 = $1_1 + $0_1 | 0;
                label$2: {
                  if ($2_1 & 1 | 0) {
                    break label$2;
                  }
                  if (!($2_1 & 3 | 0)) {
                    break label$1;
                  }
                  $2_1 = HEAP322[$1_1 >> 2] | 0;
                  $1_1 = $1_1 - $2_1 | 0;
                  $4_1 = HEAP322[(0 + 1048 | 0) >> 2] | 0;
                  if ($1_1 >>> 0 < $4_1 >>> 0) {
                    break label$1;
                  }
                  $0_1 = $2_1 + $0_1 | 0;
                  label$3: {
                    if ((HEAP322[(0 + 1052 | 0) >> 2] | 0 | 0) == ($1_1 | 0)) {
                      break label$3;
                    }
                    label$4: {
                      if ($2_1 >>> 0 > 255 >>> 0) {
                        break label$4;
                      }
                      $4_1 = HEAP322[($1_1 + 8 | 0) >> 2] | 0;
                      $5_1 = $2_1 >>> 3 | 0;
                      $6_1 = ($5_1 << 3 | 0) + 1072 | 0;
                      label$5: {
                        $2_1 = HEAP322[($1_1 + 12 | 0) >> 2] | 0;
                        if (($2_1 | 0) != ($4_1 | 0)) {
                          break label$5;
                        }
                        HEAP322[(0 + 1032 | 0) >> 2] = (HEAP322[(0 + 1032 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, $5_1 | 0) | 0) | 0;
                        break label$2;
                      }
                      HEAP322[($4_1 + 12 | 0) >> 2] = $2_1;
                      HEAP322[($2_1 + 8 | 0) >> 2] = $4_1;
                      break label$2;
                    }
                    $7_1 = HEAP322[($1_1 + 24 | 0) >> 2] | 0;
                    label$6: {
                      label$7: {
                        $6_1 = HEAP322[($1_1 + 12 | 0) >> 2] | 0;
                        if (($6_1 | 0) == ($1_1 | 0)) {
                          break label$7;
                        }
                        $2_1 = HEAP322[($1_1 + 8 | 0) >> 2] | 0;
                        HEAP322[($2_1 + 12 | 0) >> 2] = $6_1;
                        HEAP322[($6_1 + 8 | 0) >> 2] = $2_1;
                        break label$6;
                      }
                      label$8: {
                        $2_1 = $1_1 + 20 | 0;
                        $4_1 = HEAP322[$2_1 >> 2] | 0;
                        if ($4_1) {
                          break label$8;
                        }
                        $2_1 = $1_1 + 16 | 0;
                        $4_1 = HEAP322[$2_1 >> 2] | 0;
                        if ($4_1) {
                          break label$8;
                        }
                        $6_1 = 0;
                        break label$6;
                      }
                      label$9: while (1) {
                        $5_1 = $2_1;
                        $6_1 = $4_1;
                        $2_1 = $6_1 + 20 | 0;
                        $4_1 = HEAP322[$2_1 >> 2] | 0;
                        if ($4_1) {
                          continue label$9;
                        }
                        $2_1 = $6_1 + 16 | 0;
                        $4_1 = HEAP322[($6_1 + 16 | 0) >> 2] | 0;
                        if ($4_1) {
                          continue label$9;
                        }
                        break label$9;
                      }
                      ;
                      HEAP322[$5_1 >> 2] = 0;
                    }
                    if (!$7_1) {
                      break label$2;
                    }
                    label$10: {
                      label$11: {
                        $4_1 = HEAP322[($1_1 + 28 | 0) >> 2] | 0;
                        $2_1 = ($4_1 << 2 | 0) + 1336 | 0;
                        if ((HEAP322[$2_1 >> 2] | 0 | 0) != ($1_1 | 0)) {
                          break label$11;
                        }
                        HEAP322[$2_1 >> 2] = $6_1;
                        if ($6_1) {
                          break label$10;
                        }
                        HEAP322[(0 + 1036 | 0) >> 2] = (HEAP322[(0 + 1036 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, $4_1 | 0) | 0) | 0;
                        break label$2;
                      }
                      HEAP322[($7_1 + ((HEAP322[($7_1 + 16 | 0) >> 2] | 0 | 0) == ($1_1 | 0) ? 16 : 20) | 0) >> 2] = $6_1;
                      if (!$6_1) {
                        break label$2;
                      }
                    }
                    HEAP322[($6_1 + 24 | 0) >> 2] = $7_1;
                    label$12: {
                      $2_1 = HEAP322[($1_1 + 16 | 0) >> 2] | 0;
                      if (!$2_1) {
                        break label$12;
                      }
                      HEAP322[($6_1 + 16 | 0) >> 2] = $2_1;
                      HEAP322[($2_1 + 24 | 0) >> 2] = $6_1;
                    }
                    $2_1 = HEAP322[($1_1 + 20 | 0) >> 2] | 0;
                    if (!$2_1) {
                      break label$2;
                    }
                    HEAP322[($6_1 + 20 | 0) >> 2] = $2_1;
                    HEAP322[($2_1 + 24 | 0) >> 2] = $6_1;
                    break label$2;
                  }
                  $2_1 = HEAP322[($3_1 + 4 | 0) >> 2] | 0;
                  if (($2_1 & 3 | 0 | 0) != (3 | 0)) {
                    break label$2;
                  }
                  HEAP322[(0 + 1040 | 0) >> 2] = $0_1;
                  HEAP322[($3_1 + 4 | 0) >> 2] = $2_1 & -2 | 0;
                  HEAP322[($1_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                  HEAP322[($1_1 + $0_1 | 0) >> 2] = $0_1;
                  return;
                }
                if ($3_1 >>> 0 <= $1_1 >>> 0) {
                  break label$1;
                }
                $2_1 = HEAP322[($3_1 + 4 | 0) >> 2] | 0;
                if (!($2_1 & 1 | 0)) {
                  break label$1;
                }
                label$13: {
                  label$14: {
                    if ($2_1 & 2 | 0) {
                      break label$14;
                    }
                    label$15: {
                      if ((HEAP322[(0 + 1056 | 0) >> 2] | 0 | 0) != ($3_1 | 0)) {
                        break label$15;
                      }
                      HEAP322[(0 + 1056 | 0) >> 2] = $1_1;
                      $0_1 = (HEAP322[(0 + 1044 | 0) >> 2] | 0) + $0_1 | 0;
                      HEAP322[(0 + 1044 | 0) >> 2] = $0_1;
                      HEAP322[($1_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                      if (($1_1 | 0) != (HEAP322[(0 + 1052 | 0) >> 2] | 0 | 0)) {
                        break label$1;
                      }
                      HEAP322[(0 + 1040 | 0) >> 2] = 0;
                      HEAP322[(0 + 1052 | 0) >> 2] = 0;
                      return;
                    }
                    label$16: {
                      if ((HEAP322[(0 + 1052 | 0) >> 2] | 0 | 0) != ($3_1 | 0)) {
                        break label$16;
                      }
                      HEAP322[(0 + 1052 | 0) >> 2] = $1_1;
                      $0_1 = (HEAP322[(0 + 1040 | 0) >> 2] | 0) + $0_1 | 0;
                      HEAP322[(0 + 1040 | 0) >> 2] = $0_1;
                      HEAP322[($1_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                      HEAP322[($1_1 + $0_1 | 0) >> 2] = $0_1;
                      return;
                    }
                    $0_1 = ($2_1 & -8 | 0) + $0_1 | 0;
                    label$17: {
                      label$18: {
                        if ($2_1 >>> 0 > 255 >>> 0) {
                          break label$18;
                        }
                        $4_1 = HEAP322[($3_1 + 8 | 0) >> 2] | 0;
                        $5_1 = $2_1 >>> 3 | 0;
                        $6_1 = ($5_1 << 3 | 0) + 1072 | 0;
                        label$19: {
                          $2_1 = HEAP322[($3_1 + 12 | 0) >> 2] | 0;
                          if (($2_1 | 0) != ($4_1 | 0)) {
                            break label$19;
                          }
                          HEAP322[(0 + 1032 | 0) >> 2] = (HEAP322[(0 + 1032 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, $5_1 | 0) | 0) | 0;
                          break label$17;
                        }
                        HEAP322[($4_1 + 12 | 0) >> 2] = $2_1;
                        HEAP322[($2_1 + 8 | 0) >> 2] = $4_1;
                        break label$17;
                      }
                      $7_1 = HEAP322[($3_1 + 24 | 0) >> 2] | 0;
                      label$20: {
                        label$21: {
                          $6_1 = HEAP322[($3_1 + 12 | 0) >> 2] | 0;
                          if (($6_1 | 0) == ($3_1 | 0)) {
                            break label$21;
                          }
                          $2_1 = HEAP322[($3_1 + 8 | 0) >> 2] | 0;
                          HEAP322[(0 + 1048 | 0) >> 2] | 0;
                          HEAP322[($2_1 + 12 | 0) >> 2] = $6_1;
                          HEAP322[($6_1 + 8 | 0) >> 2] = $2_1;
                          break label$20;
                        }
                        label$22: {
                          $2_1 = $3_1 + 20 | 0;
                          $4_1 = HEAP322[$2_1 >> 2] | 0;
                          if ($4_1) {
                            break label$22;
                          }
                          $2_1 = $3_1 + 16 | 0;
                          $4_1 = HEAP322[$2_1 >> 2] | 0;
                          if ($4_1) {
                            break label$22;
                          }
                          $6_1 = 0;
                          break label$20;
                        }
                        label$23: while (1) {
                          $5_1 = $2_1;
                          $6_1 = $4_1;
                          $2_1 = $6_1 + 20 | 0;
                          $4_1 = HEAP322[$2_1 >> 2] | 0;
                          if ($4_1) {
                            continue label$23;
                          }
                          $2_1 = $6_1 + 16 | 0;
                          $4_1 = HEAP322[($6_1 + 16 | 0) >> 2] | 0;
                          if ($4_1) {
                            continue label$23;
                          }
                          break label$23;
                        }
                        ;
                        HEAP322[$5_1 >> 2] = 0;
                      }
                      if (!$7_1) {
                        break label$17;
                      }
                      label$24: {
                        label$25: {
                          $4_1 = HEAP322[($3_1 + 28 | 0) >> 2] | 0;
                          $2_1 = ($4_1 << 2 | 0) + 1336 | 0;
                          if ((HEAP322[$2_1 >> 2] | 0 | 0) != ($3_1 | 0)) {
                            break label$25;
                          }
                          HEAP322[$2_1 >> 2] = $6_1;
                          if ($6_1) {
                            break label$24;
                          }
                          HEAP322[(0 + 1036 | 0) >> 2] = (HEAP322[(0 + 1036 | 0) >> 2] | 0) & (__wasm_rotl_i32(-2 | 0, $4_1 | 0) | 0) | 0;
                          break label$17;
                        }
                        HEAP322[($7_1 + ((HEAP322[($7_1 + 16 | 0) >> 2] | 0 | 0) == ($3_1 | 0) ? 16 : 20) | 0) >> 2] = $6_1;
                        if (!$6_1) {
                          break label$17;
                        }
                      }
                      HEAP322[($6_1 + 24 | 0) >> 2] = $7_1;
                      label$26: {
                        $2_1 = HEAP322[($3_1 + 16 | 0) >> 2] | 0;
                        if (!$2_1) {
                          break label$26;
                        }
                        HEAP322[($6_1 + 16 | 0) >> 2] = $2_1;
                        HEAP322[($2_1 + 24 | 0) >> 2] = $6_1;
                      }
                      $2_1 = HEAP322[($3_1 + 20 | 0) >> 2] | 0;
                      if (!$2_1) {
                        break label$17;
                      }
                      HEAP322[($6_1 + 20 | 0) >> 2] = $2_1;
                      HEAP322[($2_1 + 24 | 0) >> 2] = $6_1;
                    }
                    HEAP322[($1_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                    HEAP322[($1_1 + $0_1 | 0) >> 2] = $0_1;
                    if (($1_1 | 0) != (HEAP322[(0 + 1052 | 0) >> 2] | 0 | 0)) {
                      break label$13;
                    }
                    HEAP322[(0 + 1040 | 0) >> 2] = $0_1;
                    return;
                  }
                  HEAP322[($3_1 + 4 | 0) >> 2] = $2_1 & -2 | 0;
                  HEAP322[($1_1 + 4 | 0) >> 2] = $0_1 | 1 | 0;
                  HEAP322[($1_1 + $0_1 | 0) >> 2] = $0_1;
                }
                label$27: {
                  if ($0_1 >>> 0 > 255 >>> 0) {
                    break label$27;
                  }
                  $2_1 = $0_1 >>> 3 | 0;
                  $0_1 = ($2_1 << 3 | 0) + 1072 | 0;
                  label$28: {
                    label$29: {
                      $4_1 = HEAP322[(0 + 1032 | 0) >> 2] | 0;
                      $2_1 = 1 << $2_1 | 0;
                      if ($4_1 & $2_1 | 0) {
                        break label$29;
                      }
                      HEAP322[(0 + 1032 | 0) >> 2] = $4_1 | $2_1 | 0;
                      $2_1 = $0_1;
                      break label$28;
                    }
                    $2_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                  }
                  HEAP322[($0_1 + 8 | 0) >> 2] = $1_1;
                  HEAP322[($2_1 + 12 | 0) >> 2] = $1_1;
                  HEAP322[($1_1 + 12 | 0) >> 2] = $0_1;
                  HEAP322[($1_1 + 8 | 0) >> 2] = $2_1;
                  return;
                }
                $2_1 = 31;
                label$30: {
                  if ($0_1 >>> 0 > 16777215 >>> 0) {
                    break label$30;
                  }
                  $2_1 = $0_1 >>> 8 | 0;
                  $379 = $2_1;
                  $2_1 = (($2_1 + 1048320 | 0) >>> 16 | 0) & 8 | 0;
                  $4_1 = $379 << $2_1 | 0;
                  $386 = $4_1;
                  $4_1 = (($4_1 + 520192 | 0) >>> 16 | 0) & 4 | 0;
                  $6_1 = $386 << $4_1 | 0;
                  $393 = $6_1;
                  $6_1 = (($6_1 + 245760 | 0) >>> 16 | 0) & 2 | 0;
                  $2_1 = (($393 << $6_1 | 0) >>> 15 | 0) - ($2_1 | $4_1 | 0 | $6_1 | 0) | 0;
                  $2_1 = ($2_1 << 1 | 0 | (($0_1 >>> ($2_1 + 21 | 0) | 0) & 1 | 0) | 0) + 28 | 0;
                }
                HEAP322[($1_1 + 16 | 0) >> 2] = 0;
                HEAP322[($1_1 + 20 | 0) >> 2] = 0;
                HEAP322[($1_1 + 28 | 0) >> 2] = $2_1;
                $4_1 = ($2_1 << 2 | 0) + 1336 | 0;
                label$31: {
                  label$32: {
                    label$33: {
                      label$34: {
                        $6_1 = HEAP322[(0 + 1036 | 0) >> 2] | 0;
                        $3_1 = 1 << $2_1 | 0;
                        if ($6_1 & $3_1 | 0) {
                          break label$34;
                        }
                        HEAP322[(0 + 1036 | 0) >> 2] = $6_1 | $3_1 | 0;
                        HEAP322[$4_1 >> 2] = $1_1;
                        HEAP322[($1_1 + 24 | 0) >> 2] = $4_1;
                        break label$33;
                      }
                      $2_1 = $0_1 << (($2_1 | 0) == (31 | 0) ? 0 : 25 - ($2_1 >>> 1 | 0) | 0) | 0;
                      $6_1 = HEAP322[$4_1 >> 2] | 0;
                      label$35: while (1) {
                        $4_1 = $6_1;
                        if (((HEAP322[($6_1 + 4 | 0) >> 2] | 0) & -8 | 0 | 0) == ($0_1 | 0)) {
                          break label$32;
                        }
                        $6_1 = $2_1 >>> 29 | 0;
                        $2_1 = $2_1 << 1 | 0;
                        $3_1 = ($4_1 + ($6_1 & 4 | 0) | 0) + 16 | 0;
                        $6_1 = HEAP322[$3_1 >> 2] | 0;
                        if ($6_1) {
                          continue label$35;
                        }
                        break label$35;
                      }
                      ;
                      HEAP322[$3_1 >> 2] = $1_1;
                      HEAP322[($1_1 + 24 | 0) >> 2] = $4_1;
                    }
                    HEAP322[($1_1 + 12 | 0) >> 2] = $1_1;
                    HEAP322[($1_1 + 8 | 0) >> 2] = $1_1;
                    break label$31;
                  }
                  $0_1 = HEAP322[($4_1 + 8 | 0) >> 2] | 0;
                  HEAP322[($0_1 + 12 | 0) >> 2] = $1_1;
                  HEAP322[($4_1 + 8 | 0) >> 2] = $1_1;
                  HEAP322[($1_1 + 24 | 0) >> 2] = 0;
                  HEAP322[($1_1 + 12 | 0) >> 2] = $4_1;
                  HEAP322[($1_1 + 8 | 0) >> 2] = $0_1;
                }
                $1_1 = (HEAP322[(0 + 1064 | 0) >> 2] | 0) + -1 | 0;
                HEAP322[(0 + 1064 | 0) >> 2] = $1_1 ? $1_1 : -1;
              }
            }
            function $33($0_1) {
              $0_1 = $0_1 | 0;
              var $1_1 = 0;
              $1_1 = $0_1 ? $0_1 : 1;
              label$1: {
                label$2: while (1) {
                  $0_1 = $31($1_1 | 0) | 0;
                  if ($0_1) {
                    break label$1;
                  }
                  label$3: {
                    $0_1 = $36() | 0;
                    if (!$0_1) {
                      break label$3;
                    }
                    FUNCTION_TABLE[$0_1 | 0]();
                    continue label$2;
                  }
                  break label$2;
                }
                ;
                fimport$0();
                abort2();
              }
              return $0_1 | 0;
            }
            function $34($0_1) {
              $0_1 = $0_1 | 0;
              $32($0_1 | 0);
            }
            function $35($0_1) {
              $0_1 = $0_1 | 0;
              return HEAP322[$0_1 >> 2] | 0 | 0;
            }
            function $36() {
              return $35(1528 | 0) | 0 | 0;
            }
            function $37() {
              return global$0 | 0;
            }
            function $38($0_1) {
              $0_1 = $0_1 | 0;
              global$0 = $0_1;
            }
            function $39($0_1) {
              $0_1 = $0_1 | 0;
              var $1_1 = 0;
              $1_1 = (global$0 - $0_1 | 0) & -16 | 0;
              global$0 = $1_1;
              return $1_1 | 0;
            }
            function $40() {
              global$2 = 5244432;
              global$1 = (1544 + 15 | 0) & -16 | 0;
            }
            function $41() {
              return global$0 - global$1 | 0 | 0;
            }
            function $42() {
              return global$2 | 0;
            }
            function $43() {
              return global$1 | 0;
            }
            function $44($0_1) {
              $0_1 = $0_1 | 0;
            }
            function $45() {
              $44(1532 | 0);
              return 1536 | 0;
            }
            function $46($0_1) {
              $0_1 = $0_1 | 0;
              return 1 | 0;
            }
            function $47() {
              var $0_1 = 0;
              label$1: {
                $0_1 = HEAP322[($45() | 0) >> 2] | 0;
                if (!$0_1) {
                  break label$1;
                }
                label$2: while (1) {
                  $48($0_1 | 0);
                  $0_1 = HEAP322[($0_1 + 56 | 0) >> 2] | 0;
                  if ($0_1) {
                    continue label$2;
                  }
                  break label$2;
                }
                ;
              }
              $48(HEAP322[(0 + 1540 | 0) >> 2] | 0 | 0);
              $48(HEAP322[(0 + 1540 | 0) >> 2] | 0 | 0);
              $48(HEAP322[(0 + 1540 | 0) >> 2] | 0 | 0);
            }
            function $48($0_1) {
              $0_1 = $0_1 | 0;
              var i64toi32_i32$1 = 0, i64toi32_i32$0 = 0, $1_1 = 0, $2_1 = 0;
              label$1: {
                if (!$0_1) {
                  break label$1;
                }
                label$2: {
                  if ((HEAP322[($0_1 + 76 | 0) >> 2] | 0 | 0) < (0 | 0)) {
                    break label$2;
                  }
                  $46($0_1 | 0) | 0;
                }
                label$3: {
                  if ((HEAP322[($0_1 + 20 | 0) >> 2] | 0 | 0) == (HEAP322[($0_1 + 28 | 0) >> 2] | 0 | 0)) {
                    break label$3;
                  }
                  FUNCTION_TABLE[HEAP322[($0_1 + 36 | 0) >> 2] | 0 | 0]($0_1, 0, 0) | 0;
                }
                $1_1 = HEAP322[($0_1 + 4 | 0) >> 2] | 0;
                $2_1 = HEAP322[($0_1 + 8 | 0) >> 2] | 0;
                if (($1_1 | 0) == ($2_1 | 0)) {
                  break label$1;
                }
                i64toi32_i32$1 = $1_1 - $2_1 | 0;
                i64toi32_i32$0 = i64toi32_i32$1 >> 31 | 0;
                i64toi32_i32$0 = FUNCTION_TABLE[HEAP322[($0_1 + 40 | 0) >> 2] | 0 | 0]($0_1, i64toi32_i32$1, i64toi32_i32$0, 1) | 0;
                i64toi32_i32$1 = i64toi32_i32$HIGH_BITS;
              }
            }
            function __wasm_rotl_i32(var$0, var$1) {
              var$0 = var$0 | 0;
              var$1 = var$1 | 0;
              var var$2 = 0;
              var$2 = var$1 & 31 | 0;
              var$1 = (0 - var$1 | 0) & 31 | 0;
              return ((-1 >>> var$2 | 0) & var$0 | 0) << var$2 | 0 | (((-1 << var$1 | 0) & var$0 | 0) >>> var$1 | 0) | 0 | 0;
            }
            ;
            bufferView = HEAPU82;
            initActiveSegments(env);
            var FUNCTION_TABLE = Table([]);
            function __wasm_memory_size() {
              return buffer2.byteLength / 65536 | 0;
            }
            return {
              "__wasm_call_ctors": $0,
              "ReturnNumericLimits": $1,
              "CreateRand": $2,
              "Generate": $7,
              "FreeRand": $10,
              "__errno_location": $29,
              "__stdio_exit": $47,
              "emscripten_stack_init": $40,
              "emscripten_stack_get_free": $41,
              "emscripten_stack_get_base": $42,
              "emscripten_stack_get_end": $43,
              "stackSave": $37,
              "stackRestore": $38,
              "stackAlloc": $39,
              "__indirect_function_table": FUNCTION_TABLE
            };
          }
          return asmFunc(asmLibraryArg2);
        }(asmLibraryArg);
      },
      instantiate: (
        /** @suppress{checkTypes} */
        function(binary, info) {
          return {
            then: function(ok) {
              var module2 = new WebAssembly.Module(binary);
              ok({
                "instance": new WebAssembly.Instance(module2)
              });
              return { catch: function() {
              } };
            }
          };
        }
      ),
      RuntimeError: Error
    };
    wasmBinary = [];
    if (typeof WebAssembly != "object") {
      abort("no native wasm support detected");
    }
    var wasmMemory;
    var ABORT = false;
    var EXITSTATUS;
    function assert(condition, text) {
      if (!condition) {
        abort("Assertion failed" + (text ? ": " + text : ""));
      }
    }
    var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
    var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
    var buffer;
    var HEAP8;
    var HEAPU8;
    var HEAP16;
    var HEAPU16;
    var HEAP32;
    var HEAPU32;
    var HEAPF32;
    var HEAPF64;
    function updateGlobalBufferAndViews(buf) {
      buffer = buf;
      Module["HEAP8"] = HEAP8 = new Int8Array(buf);
      Module["HEAP16"] = HEAP16 = new Int16Array(buf);
      Module["HEAP32"] = HEAP32 = new Int32Array(buf);
      Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
      Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
      Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
      Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
      Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
    }
    var TOTAL_STACK = 5242880;
    if (Module["TOTAL_STACK"]) assert(TOTAL_STACK === Module["TOTAL_STACK"], "the stack size can no longer be determined at runtime");
    var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 16777216;
    legacyModuleProp("INITIAL_MEMORY", "INITIAL_MEMORY");
    assert(INITIAL_MEMORY >= TOTAL_STACK, "INITIAL_MEMORY should be larger than TOTAL_STACK, was " + INITIAL_MEMORY + "! (TOTAL_STACK=" + TOTAL_STACK + ")");
    assert(
      typeof Int32Array != "undefined" && typeof Float64Array !== "undefined" && Int32Array.prototype.subarray != void 0 && Int32Array.prototype.set != void 0,
      "JS engine does not provide full typed array support"
    );
    if (Module["wasmMemory"]) {
      wasmMemory = Module["wasmMemory"];
    } else {
      wasmMemory = new WebAssembly.Memory({
        "initial": INITIAL_MEMORY / 65536,
        "maximum": INITIAL_MEMORY / 65536
      });
    }
    if (wasmMemory) {
      buffer = wasmMemory.buffer;
    }
    INITIAL_MEMORY = buffer.byteLength;
    assert(INITIAL_MEMORY % 65536 === 0);
    updateGlobalBufferAndViews(buffer);
    var wasmTable;
    function writeStackCookie() {
      var max = _emscripten_stack_get_end();
      assert((max & 3) == 0);
      HEAP32[max >> 2] = 34821223;
      HEAP32[max + 4 >> 2] = 2310721022;
      HEAP32[0] = 1668509029;
    }
    function checkStackCookie() {
      if (ABORT) return;
      var max = _emscripten_stack_get_end();
      var cookie1 = HEAPU32[max >> 2];
      var cookie2 = HEAPU32[max + 4 >> 2];
      if (cookie1 != 34821223 || cookie2 != 2310721022) {
        abort("Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x" + cookie2.toString(16) + " 0x" + cookie1.toString(16));
      }
      if (HEAP32[0] !== 1668509029) abort("Runtime error: The application has corrupted its heap memory area (address zero)!");
    }
    (function() {
      var h16 = new Int16Array(1);
      var h8 = new Int8Array(h16.buffer);
      h16[0] = 25459;
      if (h8[0] !== 115 || h8[1] !== 99) throw "Runtime error: expected the system to be little-endian! (Run with -s SUPPORT_BIG_ENDIAN=1 to bypass)";
    })();
    var __ATPRERUN__ = [];
    var __ATINIT__ = [];
    var __ATPOSTRUN__ = [];
    var runtimeInitialized = false;
    var runtimeExited = false;
    var runtimeKeepaliveCounter = 0;
    function keepRuntimeAlive() {
      return noExitRuntime || runtimeKeepaliveCounter > 0;
    }
    function preRun() {
      if (Module["preRun"]) {
        if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
        while (Module["preRun"].length) {
          addOnPreRun(Module["preRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPRERUN__);
    }
    function initRuntime() {
      checkStackCookie();
      assert(!runtimeInitialized);
      runtimeInitialized = true;
      callRuntimeCallbacks(__ATINIT__);
    }
    function postRun() {
      checkStackCookie();
      if (Module["postRun"]) {
        if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
        while (Module["postRun"].length) {
          addOnPostRun(Module["postRun"].shift());
        }
      }
      callRuntimeCallbacks(__ATPOSTRUN__);
    }
    function addOnPreRun(cb) {
      __ATPRERUN__.unshift(cb);
    }
    function addOnInit(cb) {
      __ATINIT__.unshift(cb);
    }
    function addOnPostRun(cb) {
      __ATPOSTRUN__.unshift(cb);
    }
    assert(Math.imul, "This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    assert(Math.fround, "This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    assert(Math.clz32, "This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    assert(Math.trunc, "This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill");
    var runDependencies = 0;
    var runDependencyWatcher = null;
    var dependenciesFulfilled = null;
    var runDependencyTracking = {};
    function addRunDependency(id) {
      runDependencies++;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(!runDependencyTracking[id]);
        runDependencyTracking[id] = 1;
        if (runDependencyWatcher === null && typeof setInterval != "undefined") {
          runDependencyWatcher = setInterval(function() {
            if (ABORT) {
              clearInterval(runDependencyWatcher);
              runDependencyWatcher = null;
              return;
            }
            var shown = false;
            for (var dep in runDependencyTracking) {
              if (!shown) {
                shown = true;
                err("still waiting on run dependencies:");
              }
              err("dependency: " + dep);
            }
            if (shown) {
              err("(end of list)");
            }
          }, 1e4);
        }
      } else {
        err("warning: run dependency added without ID");
      }
    }
    function removeRunDependency(id) {
      runDependencies--;
      if (Module["monitorRunDependencies"]) {
        Module["monitorRunDependencies"](runDependencies);
      }
      if (id) {
        assert(runDependencyTracking[id]);
        delete runDependencyTracking[id];
      } else {
        err("warning: run dependency removed without ID");
      }
      if (runDependencies == 0) {
        if (runDependencyWatcher !== null) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
        }
        if (dependenciesFulfilled) {
          var callback = dependenciesFulfilled;
          dependenciesFulfilled = null;
          callback();
        }
      }
    }
    Module["preloadedImages"] = {};
    Module["preloadedAudios"] = {};
    function abort(what) {
      {
        if (Module["onAbort"]) {
          Module["onAbort"](what);
        }
      }
      what = "Aborted(" + what + ")";
      err(what);
      ABORT = true;
      EXITSTATUS = 1;
      var e = new WebAssembly.RuntimeError(what);
      throw e;
    }
    var FS = {
      error: function() {
        abort("Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1");
      },
      init: function() {
        FS.error();
      },
      createDataFile: function() {
        FS.error();
      },
      createPreloadedFile: function() {
        FS.error();
      },
      createLazyFile: function() {
        FS.error();
      },
      open: function() {
        FS.error();
      },
      mkdev: function() {
        FS.error();
      },
      registerDevice: function() {
        FS.error();
      },
      analyzePath: function() {
        FS.error();
      },
      loadFilesFromDB: function() {
        FS.error();
      },
      ErrnoError: function ErrnoError() {
        FS.error();
      }
    };
    Module["FS_createDataFile"] = FS.createDataFile;
    Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
    var dataURIPrefix = "data:application/octet-stream;base64,";
    function isDataURI(filename) {
      return filename.startsWith(dataURIPrefix);
    }
    function createExportWrapper(name, fixedasm) {
      return function() {
        var displayName = name;
        var asm2 = fixedasm;
        if (!fixedasm) {
          asm2 = Module["asm"];
        }
        assert(runtimeInitialized, "native function `" + displayName + "` called before runtime initialization");
        assert(!runtimeExited, "native function `" + displayName + "` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)");
        if (!asm2[name]) {
          assert(asm2[name], "exported native function `" + displayName + "` not found");
        }
        return asm2[name].apply(null, arguments);
      };
    }
    var wasmBinaryFile;
    wasmBinaryFile = "19937.wasm";
    if (!isDataURI(wasmBinaryFile)) {
      wasmBinaryFile = locateFile(wasmBinaryFile);
    }
    function getBinary(file) {
      try {
        if (file == wasmBinaryFile && wasmBinary) {
          return new Uint8Array(wasmBinary);
        }
        var binary = tryParseAsDataURI(file);
        if (binary) {
          return binary;
        }
        if (readBinary) {
          return readBinary(file);
        } else {
          throw "sync fetching of the wasm failed: you can preload it to Module['wasmBinary'] manually, or emcc.py will do that for you when generating HTML (but not JS)";
        }
      } catch (err2) {
        abort(err2);
      }
    }
    function instantiateSync(file, info) {
      var instance;
      var module2;
      var binary;
      try {
        binary = getBinary(file);
        module2 = new WebAssembly.Module(binary);
        instance = new WebAssembly.Instance(module2, info);
      } catch (e) {
        var str = e.toString();
        err("failed to compile wasm module: " + str);
        if (str.includes("imported Memory") || str.includes("memory import")) {
          err("Memory size incompatibility issues may be due to changing INITIAL_MEMORY at runtime to something too large. Use ALLOW_MEMORY_GROWTH to allow any size memory (and also make sure not to set INITIAL_MEMORY at runtime to something smaller than it was at compile time).");
        }
        throw e;
      }
      return [instance, module2];
    }
    function createWasm() {
      var info = {
        "env": asmLibraryArg,
        "wasi_snapshot_preview1": asmLibraryArg
      };
      function receiveInstance(instance, module2) {
        var exports3 = instance.exports;
        Module["asm"] = exports3;
        wasmTable = Module["asm"]["__indirect_function_table"];
        assert(wasmTable, "table not found in wasm exports");
        addOnInit(Module["asm"]["__wasm_call_ctors"]);
        removeRunDependency("wasm-instantiate");
      }
      addRunDependency("wasm-instantiate");
      if (Module["instantiateWasm"]) {
        try {
          var exports2 = Module["instantiateWasm"](info, receiveInstance);
          return exports2;
        } catch (e) {
          err("Module.instantiateWasm callback failed with error: " + e);
          return false;
        }
      }
      var result = instantiateSync(wasmBinaryFile, info);
      receiveInstance(result[0]);
      return Module["asm"];
    }
    function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == "function") {
          callback(Module);
          continue;
        }
        var func = callback.func;
        if (typeof func == "number") {
          if (callback.arg === void 0) {
            getWasmTableEntry(func)();
          } else {
            getWasmTableEntry(func)(callback.arg);
          }
        } else {
          func(callback.arg === void 0 ? null : callback.arg);
        }
      }
    }
    var wasmTableMirror = [];
    function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
      return func;
    }
    function _abort() {
      abort("native code called abort()");
    }
    function abortOnCannotGrowMemory(requestedSize) {
      abort("Cannot enlarge memory arrays to size " + requestedSize + " bytes (OOM). Either (1) compile with  -s INITIAL_MEMORY=X  with X higher than the current value " + HEAP8.length + ", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ");
    }
    function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      abortOnCannotGrowMemory(requestedSize);
    }
    var ASSERTIONS = true;
    function intArrayToString(array) {
      var ret = [];
      for (var i = 0; i < array.length; i++) {
        var chr = array[i];
        if (chr > 255) {
          if (ASSERTIONS) {
            assert(false, "Character code " + chr + " (" + String.fromCharCode(chr) + ")  at offset " + i + " not in 0x00-0xFF.");
          }
          chr &= 255;
        }
        ret.push(String.fromCharCode(chr));
      }
      return ret.join("");
    }
    var decodeBase64 = typeof atob == "function" ? atob : function(input) {
      var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3);
        }
      } while (i < input.length);
      return output;
    };
    function intArrayFromBase64(s) {
      if (typeof ENVIRONMENT_IS_NODE == "boolean" && ENVIRONMENT_IS_NODE) {
        var buf = Buffer.from(s, "base64");
        return new Uint8Array(buf["buffer"], buf["byteOffset"], buf["byteLength"]);
      }
      try {
        var decoded = decodeBase64(s);
        var bytes = new Uint8Array(decoded.length);
        for (var i = 0; i < decoded.length; ++i) {
          bytes[i] = decoded.charCodeAt(i);
        }
        return bytes;
      } catch (_) {
        throw new Error("Converting base64 string to bytes failed.");
      }
    }
    function tryParseAsDataURI(filename) {
      if (!isDataURI(filename)) {
        return;
      }
      return intArrayFromBase64(filename.slice(dataURIPrefix.length));
    }
    function checkIncomingModuleAPI() {
      ignoredModuleProp("fetchSettings");
    }
    var asmLibraryArg = {
      "abort": _abort,
      "emscripten_resize_heap": _emscripten_resize_heap,
      "getTempRet0": getTempRet0,
      "memory": wasmMemory,
      "setTempRet0": setTempRet0
    };
    var asm = createWasm();
    var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors", asm);
    var _ReturnNumericLimits = Module["_ReturnNumericLimits"] = createExportWrapper("ReturnNumericLimits", asm);
    var _CreateRand = Module["_CreateRand"] = createExportWrapper("CreateRand", asm);
    var _Generate = Module["_Generate"] = createExportWrapper("Generate", asm);
    var _FreeRand = Module["_FreeRand"] = createExportWrapper("FreeRand", asm);
    var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location", asm);
    var ___stdio_exit = Module["___stdio_exit"] = createExportWrapper("__stdio_exit", asm);
    var _emscripten_stack_init = Module["_emscripten_stack_init"] = asm["emscripten_stack_init"];
    var _emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = asm["emscripten_stack_get_free"];
    var _emscripten_stack_get_base = Module["_emscripten_stack_get_base"] = asm["emscripten_stack_get_base"];
    var _emscripten_stack_get_end = Module["_emscripten_stack_get_end"] = asm["emscripten_stack_get_end"];
    var stackSave = Module["stackSave"] = createExportWrapper("stackSave", asm);
    var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore", asm);
    var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc", asm);
    unexportedRuntimeFunction("intArrayFromString", false);
    unexportedRuntimeFunction("intArrayToString", false);
    unexportedRuntimeFunction("ccall", false);
    unexportedRuntimeFunction("cwrap", false);
    unexportedRuntimeFunction("setValue", false);
    unexportedRuntimeFunction("getValue", false);
    unexportedRuntimeFunction("allocate", false);
    unexportedRuntimeFunction("UTF8ArrayToString", false);
    unexportedRuntimeFunction("UTF8ToString", false);
    unexportedRuntimeFunction("stringToUTF8Array", false);
    unexportedRuntimeFunction("stringToUTF8", false);
    unexportedRuntimeFunction("lengthBytesUTF8", false);
    unexportedRuntimeFunction("stackTrace", false);
    unexportedRuntimeFunction("addOnPreRun", false);
    unexportedRuntimeFunction("addOnInit", false);
    unexportedRuntimeFunction("addOnPreMain", false);
    unexportedRuntimeFunction("addOnExit", false);
    unexportedRuntimeFunction("addOnPostRun", false);
    unexportedRuntimeFunction("writeStringToMemory", false);
    unexportedRuntimeFunction("writeArrayToMemory", false);
    unexportedRuntimeFunction("writeAsciiToMemory", false);
    unexportedRuntimeFunction("addRunDependency", true);
    unexportedRuntimeFunction("removeRunDependency", true);
    unexportedRuntimeFunction("FS_createFolder", false);
    unexportedRuntimeFunction("FS_createPath", true);
    unexportedRuntimeFunction("FS_createDataFile", true);
    unexportedRuntimeFunction("FS_createPreloadedFile", true);
    unexportedRuntimeFunction("FS_createLazyFile", true);
    unexportedRuntimeFunction("FS_createLink", false);
    unexportedRuntimeFunction("FS_createDevice", true);
    unexportedRuntimeFunction("FS_unlink", true);
    unexportedRuntimeFunction("getLEB", false);
    unexportedRuntimeFunction("getFunctionTables", false);
    unexportedRuntimeFunction("alignFunctionTables", false);
    unexportedRuntimeFunction("registerFunctions", false);
    unexportedRuntimeFunction("addFunction", false);
    unexportedRuntimeFunction("removeFunction", false);
    unexportedRuntimeFunction("getFuncWrapper", false);
    unexportedRuntimeFunction("prettyPrint", false);
    unexportedRuntimeFunction("dynCall", false);
    unexportedRuntimeFunction("getCompilerSetting", false);
    unexportedRuntimeFunction("print", false);
    unexportedRuntimeFunction("printErr", false);
    unexportedRuntimeFunction("getTempRet0", false);
    unexportedRuntimeFunction("setTempRet0", false);
    unexportedRuntimeFunction("callMain", false);
    unexportedRuntimeFunction("abort", false);
    unexportedRuntimeFunction("keepRuntimeAlive", false);
    unexportedRuntimeFunction("zeroMemory", false);
    unexportedRuntimeFunction("stringToNewUTF8", false);
    unexportedRuntimeFunction("abortOnCannotGrowMemory", false);
    unexportedRuntimeFunction("emscripten_realloc_buffer", false);
    unexportedRuntimeFunction("ENV", false);
    unexportedRuntimeFunction("withStackSave", false);
    unexportedRuntimeFunction("ERRNO_CODES", false);
    unexportedRuntimeFunction("ERRNO_MESSAGES", false);
    unexportedRuntimeFunction("setErrNo", false);
    unexportedRuntimeFunction("inetPton4", false);
    unexportedRuntimeFunction("inetNtop4", false);
    unexportedRuntimeFunction("inetPton6", false);
    unexportedRuntimeFunction("inetNtop6", false);
    unexportedRuntimeFunction("readSockaddr", false);
    unexportedRuntimeFunction("writeSockaddr", false);
    unexportedRuntimeFunction("DNS", false);
    unexportedRuntimeFunction("getHostByName", false);
    unexportedRuntimeFunction("Protocols", false);
    unexportedRuntimeFunction("Sockets", false);
    unexportedRuntimeFunction("getRandomDevice", false);
    unexportedRuntimeFunction("traverseStack", false);
    unexportedRuntimeFunction("convertFrameToPC", false);
    unexportedRuntimeFunction("UNWIND_CACHE", false);
    unexportedRuntimeFunction("saveInUnwindCache", false);
    unexportedRuntimeFunction("convertPCtoSourceLocation", false);
    unexportedRuntimeFunction("readAsmConstArgsArray", false);
    unexportedRuntimeFunction("readAsmConstArgs", false);
    unexportedRuntimeFunction("mainThreadEM_ASM", false);
    unexportedRuntimeFunction("jstoi_q", false);
    unexportedRuntimeFunction("jstoi_s", false);
    unexportedRuntimeFunction("getExecutableName", false);
    unexportedRuntimeFunction("listenOnce", false);
    unexportedRuntimeFunction("autoResumeAudioContext", false);
    unexportedRuntimeFunction("dynCallLegacy", false);
    unexportedRuntimeFunction("getDynCaller", false);
    unexportedRuntimeFunction("dynCall", false);
    unexportedRuntimeFunction("callRuntimeCallbacks", false);
    unexportedRuntimeFunction("wasmTableMirror", false);
    unexportedRuntimeFunction("setWasmTableEntry", false);
    unexportedRuntimeFunction("getWasmTableEntry", false);
    unexportedRuntimeFunction("handleException", false);
    unexportedRuntimeFunction("runtimeKeepalivePush", false);
    unexportedRuntimeFunction("runtimeKeepalivePop", false);
    unexportedRuntimeFunction("callUserCallback", false);
    unexportedRuntimeFunction("maybeExit", false);
    unexportedRuntimeFunction("safeSetTimeout", false);
    unexportedRuntimeFunction("asmjsMangle", false);
    unexportedRuntimeFunction("asyncLoad", false);
    unexportedRuntimeFunction("alignMemory", false);
    unexportedRuntimeFunction("mmapAlloc", false);
    unexportedRuntimeFunction("reallyNegative", false);
    unexportedRuntimeFunction("unSign", false);
    unexportedRuntimeFunction("reSign", false);
    unexportedRuntimeFunction("formatString", false);
    unexportedRuntimeFunction("PATH", false);
    unexportedRuntimeFunction("PATH_FS", false);
    unexportedRuntimeFunction("SYSCALLS", false);
    unexportedRuntimeFunction("getSocketFromFD", false);
    unexportedRuntimeFunction("getSocketAddress", false);
    unexportedRuntimeFunction("JSEvents", false);
    unexportedRuntimeFunction("registerKeyEventCallback", false);
    unexportedRuntimeFunction("specialHTMLTargets", false);
    unexportedRuntimeFunction("maybeCStringToJsString", false);
    unexportedRuntimeFunction("findEventTarget", false);
    unexportedRuntimeFunction("findCanvasEventTarget", false);
    unexportedRuntimeFunction("getBoundingClientRect", false);
    unexportedRuntimeFunction("fillMouseEventData", false);
    unexportedRuntimeFunction("registerMouseEventCallback", false);
    unexportedRuntimeFunction("registerWheelEventCallback", false);
    unexportedRuntimeFunction("registerUiEventCallback", false);
    unexportedRuntimeFunction("registerFocusEventCallback", false);
    unexportedRuntimeFunction("fillDeviceOrientationEventData", false);
    unexportedRuntimeFunction("registerDeviceOrientationEventCallback", false);
    unexportedRuntimeFunction("fillDeviceMotionEventData", false);
    unexportedRuntimeFunction("registerDeviceMotionEventCallback", false);
    unexportedRuntimeFunction("screenOrientation", false);
    unexportedRuntimeFunction("fillOrientationChangeEventData", false);
    unexportedRuntimeFunction("registerOrientationChangeEventCallback", false);
    unexportedRuntimeFunction("fillFullscreenChangeEventData", false);
    unexportedRuntimeFunction("registerFullscreenChangeEventCallback", false);
    unexportedRuntimeFunction("registerRestoreOldStyle", false);
    unexportedRuntimeFunction("hideEverythingExceptGivenElement", false);
    unexportedRuntimeFunction("restoreHiddenElements", false);
    unexportedRuntimeFunction("setLetterbox", false);
    unexportedRuntimeFunction("currentFullscreenStrategy", false);
    unexportedRuntimeFunction("restoreOldWindowedStyle", false);
    unexportedRuntimeFunction("softFullscreenResizeWebGLRenderTarget", false);
    unexportedRuntimeFunction("doRequestFullscreen", false);
    unexportedRuntimeFunction("fillPointerlockChangeEventData", false);
    unexportedRuntimeFunction("registerPointerlockChangeEventCallback", false);
    unexportedRuntimeFunction("registerPointerlockErrorEventCallback", false);
    unexportedRuntimeFunction("requestPointerLock", false);
    unexportedRuntimeFunction("fillVisibilityChangeEventData", false);
    unexportedRuntimeFunction("registerVisibilityChangeEventCallback", false);
    unexportedRuntimeFunction("registerTouchEventCallback", false);
    unexportedRuntimeFunction("fillGamepadEventData", false);
    unexportedRuntimeFunction("registerGamepadEventCallback", false);
    unexportedRuntimeFunction("registerBeforeUnloadEventCallback", false);
    unexportedRuntimeFunction("fillBatteryEventData", false);
    unexportedRuntimeFunction("battery", false);
    unexportedRuntimeFunction("registerBatteryEventCallback", false);
    unexportedRuntimeFunction("setCanvasElementSize", false);
    unexportedRuntimeFunction("getCanvasElementSize", false);
    unexportedRuntimeFunction("demangle", false);
    unexportedRuntimeFunction("demangleAll", false);
    unexportedRuntimeFunction("jsStackTrace", false);
    unexportedRuntimeFunction("stackTrace", false);
    unexportedRuntimeFunction("getEnvStrings", false);
    unexportedRuntimeFunction("checkWasiClock", false);
    unexportedRuntimeFunction("flush_NO_FILESYSTEM", false);
    unexportedRuntimeFunction("writeI53ToI64", false);
    unexportedRuntimeFunction("writeI53ToI64Clamped", false);
    unexportedRuntimeFunction("writeI53ToI64Signaling", false);
    unexportedRuntimeFunction("writeI53ToU64Clamped", false);
    unexportedRuntimeFunction("writeI53ToU64Signaling", false);
    unexportedRuntimeFunction("readI53FromI64", false);
    unexportedRuntimeFunction("readI53FromU64", false);
    unexportedRuntimeFunction("convertI32PairToI53", false);
    unexportedRuntimeFunction("convertU32PairToI53", false);
    unexportedRuntimeFunction("setImmediateWrapped", false);
    unexportedRuntimeFunction("clearImmediateWrapped", false);
    unexportedRuntimeFunction("polyfillSetImmediate", false);
    unexportedRuntimeFunction("uncaughtExceptionCount", false);
    unexportedRuntimeFunction("exceptionLast", false);
    unexportedRuntimeFunction("exceptionCaught", false);
    unexportedRuntimeFunction("ExceptionInfo", false);
    unexportedRuntimeFunction("CatchInfo", false);
    unexportedRuntimeFunction("exception_addRef", false);
    unexportedRuntimeFunction("exception_decRef", false);
    unexportedRuntimeFunction("Browser", false);
    unexportedRuntimeFunction("funcWrappers", false);
    unexportedRuntimeFunction("getFuncWrapper", false);
    unexportedRuntimeFunction("setMainLoop", false);
    unexportedRuntimeFunction("wget", false);
    unexportedRuntimeFunction("FS", false);
    unexportedRuntimeFunction("MEMFS", false);
    unexportedRuntimeFunction("TTY", false);
    unexportedRuntimeFunction("PIPEFS", false);
    unexportedRuntimeFunction("SOCKFS", false);
    unexportedRuntimeFunction("_setNetworkCallback", false);
    unexportedRuntimeFunction("tempFixedLengthArray", false);
    unexportedRuntimeFunction("miniTempWebGLFloatBuffers", false);
    unexportedRuntimeFunction("heapObjectForWebGLType", false);
    unexportedRuntimeFunction("heapAccessShiftForWebGLHeap", false);
    unexportedRuntimeFunction("GL", false);
    unexportedRuntimeFunction("emscriptenWebGLGet", false);
    unexportedRuntimeFunction("computeUnpackAlignedImageSize", false);
    unexportedRuntimeFunction("emscriptenWebGLGetTexPixelData", false);
    unexportedRuntimeFunction("emscriptenWebGLGetUniform", false);
    unexportedRuntimeFunction("webglGetUniformLocation", false);
    unexportedRuntimeFunction("webglPrepareUniformLocationsBeforeFirstUse", false);
    unexportedRuntimeFunction("webglGetLeftBracePos", false);
    unexportedRuntimeFunction("emscriptenWebGLGetVertexAttrib", false);
    unexportedRuntimeFunction("writeGLArray", false);
    unexportedRuntimeFunction("AL", false);
    unexportedRuntimeFunction("SDL_unicode", false);
    unexportedRuntimeFunction("SDL_ttfContext", false);
    unexportedRuntimeFunction("SDL_audio", false);
    unexportedRuntimeFunction("SDL", false);
    unexportedRuntimeFunction("SDL_gfx", false);
    unexportedRuntimeFunction("GLUT", false);
    unexportedRuntimeFunction("EGL", false);
    unexportedRuntimeFunction("GLFW_Window", false);
    unexportedRuntimeFunction("GLFW", false);
    unexportedRuntimeFunction("GLEW", false);
    unexportedRuntimeFunction("IDBStore", false);
    unexportedRuntimeFunction("runAndAbortIfError", false);
    unexportedRuntimeFunction("warnOnce", false);
    unexportedRuntimeFunction("stackSave", false);
    unexportedRuntimeFunction("stackRestore", false);
    unexportedRuntimeFunction("stackAlloc", false);
    unexportedRuntimeFunction("AsciiToString", false);
    unexportedRuntimeFunction("stringToAscii", false);
    unexportedRuntimeFunction("UTF16ToString", false);
    unexportedRuntimeFunction("stringToUTF16", false);
    unexportedRuntimeFunction("lengthBytesUTF16", false);
    unexportedRuntimeFunction("UTF32ToString", false);
    unexportedRuntimeFunction("stringToUTF32", false);
    unexportedRuntimeFunction("lengthBytesUTF32", false);
    unexportedRuntimeFunction("allocateUTF8", false);
    unexportedRuntimeFunction("allocateUTF8OnStack", false);
    Module["writeStackCookie"] = writeStackCookie;
    Module["checkStackCookie"] = checkStackCookie;
    unexportedRuntimeFunction("intArrayFromBase64", false);
    unexportedRuntimeFunction("tryParseAsDataURI", false);
    unexportedRuntimeSymbol("ALLOC_NORMAL", false);
    unexportedRuntimeSymbol("ALLOC_STACK", false);
    var calledRun;
    function ExitStatus(status) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + status + ")";
      this.status = status;
    }
    dependenciesFulfilled = function runCaller() {
      if (!calledRun) run();
      if (!calledRun) dependenciesFulfilled = runCaller;
    };
    function stackCheckInit() {
      _emscripten_stack_init();
      writeStackCookie();
    }
    function run(args) {
      args = args || arguments_;
      if (runDependencies > 0) {
        return;
      }
      stackCheckInit();
      preRun();
      if (runDependencies > 0) {
        return;
      }
      function doRun() {
        if (calledRun) return;
        calledRun = true;
        Module["calledRun"] = true;
        if (ABORT) return;
        initRuntime();
        if (Module["onRuntimeInitialized"]) Module["onRuntimeInitialized"]();
        assert(!Module["_main"], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');
        postRun();
      }
      if (Module["setStatus"]) {
        Module["setStatus"]("Running...");
        setTimeout(function() {
          setTimeout(function() {
            Module["setStatus"]("");
          }, 1);
          doRun();
        }, 1);
      } else {
        doRun();
      }
      checkStackCookie();
    }
    Module["run"] = run;
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].pop()();
      }
    }
    run();
  }
});

// node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/lib/wrapper.js
var require_wrapper = __commonJS({
  "node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/lib/wrapper.js"(exports, module) {
    "use strict";
    var _rand = require__();
    module.exports = {
      MAX_INT: _rand._ReturnNumericLimits(),
      createRand: _rand._CreateRand,
      freeRand: _rand._FreeRand,
      generate: _rand._Generate
    };
  }
});

// node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/lib/rand.js
var require_rand = __commonJS({
  "node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/lib/rand.js"(exports, module) {
    "use strict";
    var rand = require_wrapper();
    var Mt19937 = class {
      constructor(seed, min, max) {
        seed = seed || 0;
        min = min || 0;
        max = max === void 0 ? rand.MAX_INT : max;
        this.destroyed = false;
        Object.defineProperty(this, "generator", {
          enumerable: false,
          writable: false,
          configurable: false,
          value: rand.createRand(min, max, seed)
        });
      }
      next() {
        if (this.destroyed) {
          throw new Error("This generator was destroyed.");
        }
        return rand.generate(this.generator);
      }
      destroy() {
        if (this.destroyed) return;
        rand.freeRand(this.generator);
        this.destroyed = true;
      }
    };
    module.exports = Mt19937;
  }
});

// node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/index.js
var require_mt19937 = __commonJS({
  "node_modules/.pnpm/@crand+mt19937@3.1.1/node_modules/@crand/mt19937/index.js"(exports, module) {
    "use strict";
    module.exports = require_rand();
  }
});

// node_modules/.pnpm/flatten@1.0.3/node_modules/flatten/index.js
var require_flatten = __commonJS({
  "node_modules/.pnpm/flatten@1.0.3/node_modules/flatten/index.js"(exports, module) {
    module.exports = function flatten(list, depth) {
      depth = typeof depth == "number" ? depth : Infinity;
      if (!depth) {
        if (Array.isArray(list)) {
          return list.map(function(i) {
            return i;
          });
        }
        return list;
      }
      return _flatten(list, 1);
      function _flatten(list2, d) {
        return list2.reduce(function(acc, item) {
          if (Array.isArray(item) && d < depth) {
            return acc.concat(_flatten(item, d + 1));
          } else {
            return acc.concat(item);
          }
        }, []);
      }
    };
  }
});

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/f_text.js
var require_f_text = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/f_text.js"(exports, module) {
    "use strict";
    module.exports = "赵 钱 孙 李 周 吴 郑 王 冯 陈 褚 卫\n蒋 沈 韩 杨 朱 秦 尤 许 何 吕 施 张\n孔 曹 严 华 金 魏 陶 姜 戚 谢 邹 喻\n柏 水 窦 章 云 苏 潘 葛 奚 范 彭 郎\n鲁 韦 昌 马 苗 凤 花 方 俞 任 袁 柳\n酆 鲍 史 唐 费 廉 岑 薛 雷 贺 倪 汤\n滕 殷 罗 毕 郝 邬 安 常 乐 于 时 傅\n皮 卞 齐 康 伍 余 元 卜 顾 孟 平 黄\n和 穆 萧 尹 姚 邵 湛 汪 祁 毛 禹 狄\n米 贝 明 臧 计 伏 成 戴 谈 宋 茅 庞\n熊 纪 舒 屈 项 祝 董 梁 杜 阮 蓝 闵\n席 季 麻 强 贾 路 娄 危 江 童 颜 郭\n梅 盛 林 刁 锺 徐 邱 骆 高 夏 蔡 田\n樊 胡 凌 霍 虞 万 支 柯 昝 管 卢 莫\n经 房 裘 缪 干 解 应 宗 丁 宣 贲 邓\n\n郁 单 杭 洪 包 诸 左 石 崔 吉 钮 龚\n程 嵇 邢 滑 裴 陆 荣 翁 荀 羊 於 惠\n甄 麴 家 封 芮 羿 储 靳 汲 邴 糜 松\n井 段 富 巫 乌 焦 巴 弓 牧 隗 山 谷\n车 侯 宓 蓬 全 郗 班 仰 秋 仲 伊 宫\n宁 仇 栾 暴 甘 钭 历 戎 祖 武 符 刘\n景 詹 束 龙 叶 幸 司 韶 郜 黎 蓟 溥\n印 宿 白 怀 蒲 邰 从 鄂 索 咸 籍 赖\n卓 蔺 屠 蒙 池 乔 阳 郁 胥 能 苍 双\n闻 莘 党 翟 谭 贡 劳 逄 姬 申 扶 堵\n冉 宰 郦 雍 却 璩 桑 桂 濮 牛 寿 通\n边 扈 燕 冀 僪 浦 尚 农 温 别 庄 晏\n柴 瞿 阎 充 慕 连 茹 习 宦 艾 鱼 容\n向 古 易 慎 戈 廖 庾 终 暨 居 衡 步\n都 耿 满 弘 匡 国 文 寇 广 禄 阙 东\n\n欧 殳 沃 利 蔚 越 夔 隆 师 巩 厍 聂\n晁 勾 敖 融 冷 訾 辛 阚 那 简 饶 空\n曾 毋 沙 乜 养 鞠 须 丰 巢 关 蒯 相\n查 后 荆 红 游 竺 权 逮 盍 益 桓 公\n万俟 司马 上官 欧阳 夏侯 诸葛 闻人 东方 赫连 皇甫 尉迟 公羊\n澹台 公冶 宗政 濮阳 淳于 单于 太叔 申屠 公孙 仲孙 轩辕 令狐\n钟离 宇文 长孙 慕容 司徒 司空 召 有 舜 叶赫那拉 丛 岳\n寸 贰 皇 侨 彤 竭 端 赫 实 甫 集 象\n翠 狂 辟 典 良 函 芒 苦 其 京 中 夕\n之 章佳 那拉 冠 宾 香 果 依尔根觉罗 依尔觉罗 萨嘛喇 赫舍里 额尔德特\n萨克达 钮祜禄 他塔喇 喜塔腊 讷殷富察 叶赫那兰 库雅喇 瓜尔佳 舒穆禄 爱新觉罗 索绰络 纳喇\n乌雅 范姜 碧鲁 张廖 张简 图门 太史 公叔 乌孙 完颜 马佳 佟佳\n富察 费莫 蹇 称 诺 来 多 繁 戊 朴 回 毓\n税 荤 靖 绪 愈 硕 牢 买 但 巧 枚 撒\n泰 秘 亥 绍 以 壬 森 斋 释 奕 姒 朋\n\n求 羽 用 占 真 穰 翦 闾 漆 贵 代 贯\n旁 崇 栋 告 休 褒 谏 锐 皋 闳 在 歧\n禾 示 是 委 钊 频 嬴 呼 大 威 昂 律\n冒 保 系 抄 定 化 莱 校 么 抗 祢 綦\n悟 宏 功 庚 务 敏 捷 拱 兆 丑 丙 畅\n苟 随 类 卯 俟 友 答 乙 允 甲 留 尾\n佼 玄 乘 裔 延 植 环 矫 赛 昔 侍 度\n旷 遇 偶 前 由 咎 塞 敛 受 泷 袭 衅\n叔 圣 御 夫 仆 镇 藩 邸 府 掌 首 员\n焉 戏 可 智 尔 凭 悉 进 笃 厚 仁 业\n肇 资 合 仍 九 衷 哀 刑 俎 仵 圭 夷\n徭 蛮 汗 孛 乾 帖 罕 洛 淦 洋 邶 郸\n郯 邗 邛 剑 虢 隋 蒿 茆 菅 苌 树 桐\n锁 钟 机 盘 铎 斛 玉 线 针 箕 庹 绳\n磨 蒉 瓮 弭 刀 疏 牵 浑 恽 势 世 仝\n\n同 蚁 止 戢 睢 冼 种 涂 肖 己 泣 潜\n卷 脱 谬 蹉 赧 浮 顿 说 次 错 念 夙\n斯 完 丹 表 聊 源 姓 吾 寻 展 出 不\n户 闭 才 无 书 学 愚 本 性 雪 霜 烟\n寒 少 字 桥 板 斐 独 千 诗 嘉 扬 善\n揭 祈 析 赤 紫 青 柔 刚 奇 拜 佛 陀\n弥 阿 素 长 僧 隐 仙 隽 宇 祭 酒 淡\n塔 琦 闪 始 星 南 天 接 波 碧 速 禚\n腾 潮 镜 似 澄 潭 謇 纵 渠 奈 风 春\n濯 沐 茂 英 兰 檀 藤 枝 检 生 折 登\n驹 骑 貊 虎 肥 鹿 雀 野 禽 飞 节 宜\n鲜 粟 栗 豆 帛 官 布 衣 藏 宝 钞 银\n门 盈 庆 喜 及 普 建 营 巨 望 希 道\n载 声 漫 犁 力 贸 勤 革 改 兴 亓 睦\n修 信 闽 北 守 坚 勇 汉 练 尉 士 旅\n\n五 令 将 旗 军 行 奉 敬 恭 仪 母 堂\n丘 义 礼 慈 孝 理 伦 卿 问 永 辉 位\n让 尧 依 犹 介 承 市 所 苑 杞 剧 第\n零 谌 招 续 达 忻 六 鄞 战 迟 候 宛\n励 粘 萨 邝 覃 辜 初 楼 城 区 局 台\n原 考 妫 纳 泉 老 清 德 卑 过 麦 曲\n竹 百 福 言 第五 佟 爱 年 笪 谯 哈 墨\n南宫 赏 伯 佴 佘 牟 商 西门 东门 左丘 梁丘 琴\n后 况 亢 缑 帅 微生 羊舌 海 归 呼延 南门 东郭\n百里 钦 鄢 汝 法 闫 楚 晋 谷梁 宰父 夹谷 拓跋\n壤驷 乐正 漆雕 公西 巫马 端木 颛孙 子车 督 仉 司寇 亓官\n鲜于 锺离 盖 逯 库 郏 逢 阴 薄 厉 稽 闾丘\n公良 段干 开 光 操 瑞 眭 泥 运 摩 伟 铁\n迮";
  }
});

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/f.js
var require_f = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/f.js"(exports, module) {
    "use strict";
    var flatten = require_flatten();
    var text = require_f_text();
    var surnames = [];
    var maxWeight = 1440 * 1e4;
    var weightStep = 1e4;
    var currentWeight = 0;
    var currentWeightDuration = maxWeight;
    var blocks = text.split("\n\n");
    for (const block of blocks) {
      const names = block.split("\n").map((line) => line.split(" "));
      const flattened = flatten(names).filter((name) => name !== "");
      if (!flattened.length) continue;
      for (let i = 0; i < flattened.length; i++) {
        surnames.push({
          name: flattened[i],
          min: currentWeight,
          max: currentWeight + currentWeightDuration - 1,
          duration: currentWeightDuration
        });
        currentWeight += currentWeightDuration;
        currentWeightDuration -= weightStep;
      }
    }
    module.exports = surnames;
  }
});

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/lib/surname.js
var require_surname = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/lib/surname.js"(exports, module) {
    "use strict";
    require_polyfill_browserify();
    var Mt19937 = require_mt19937();
    var surnames = require_f();
    var count = surnames[surnames.length - 1].max;
    var random = new Mt19937(Date.now(), 0, count - 1);
    process.on("exit", () => {
      random.destroy();
    });
    function getOne(opt = {}) {
      opt = opt || {};
      let mod = count;
      if (opt.useSurnamesCountAtTheTop && (opt.useSurnamesCountAtTheTop > 0 && opt.useSurnamesCountAtTheTop < surnames.length)) {
        mod = surnames[opt.useSurnamesCountAtTheTop - 1].max;
      }
      const weight = random.next() % mod;
      let surname = surnames.find((name) => name.min <= weight && name.max >= weight);
      if (!surname) surname = surnames[0];
      return surname.name;
    }
    module.exports = {
      getOne
    };
  }
});

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/n_text.js
var require_n_text = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/n_text.js"(exports, module) {
    "use strict";
    module.exports = "1 一 土：克父伤母，性刚果断，少年艰难，中年劳，晚年吉祥。\n1 乙 土：孤独，幼年多灾，中年成功，离祖大吉，出外贵人现，环境良好。\n2 刀 金：多刑，克妻伤子，怀才不遇，忌车怕水，多灾厄。\n2 人 金：英俊佳人，环境良好，温和贤淑，荣贵成功。\n2 入 金：病弱短寿，多灾厄，多刑克，中年多灾，晚年吉祥。\n2 卜 水：英俊才人，温和伶俐，中年成功隆昌，贵人明现，欠子之字。\n2 丁 火：忧心劳神，身弱多病，中年劳苦，晚年吉祥。\n2 二 火：忌车怕水，多灾厄，或身弱多病，中年奔波，晚年幸福。\n2 力 火：孤独，刑克父母，少年艰难，中年成功隆昌，智勇双全。\n2 了 火：家破人亡，困苦一生，有子亦不孝，了然一生。\n2 又 土：性刚，奔走他乡吉利，中年有灾厄，晚年享福。\n3 才 金：多才巧智，清雅荣贵，成功隆昌，环境良好。\n3 川 金：克偶伤子，双妻之格，中年隆昌，晚年劳神。\n3 寸 金：品性温良，晚婚大吉，环境良好，中年多灾，晚年隆昌。\n3 千 金：精明公正，义利分明，官运旺盛，成功隆昌，环境良好。\n3 刃 金：忧心劳神，事劳无功，病弱短寿，或牢狱之字。\n3 三 金：孤独，幼年辛苦，出外逢贵得财，中年多劳，晚年成功隆昌。\n3 上 金：一生清雅荣贵，但不善仁和，子孙兴旺，二子吉祥。\n3 士 金：身弱短寿，幼年辛苦，中年隆昌，晚年劳神，少乐之字。\n3 夕 金：少年艰难，出外大吉，性刚多灾，刑偶伤子，晚年享福。\n3 小 金：清秀伶俐，多才巧智，早婚不宜，一生清闲幸福。\n3 干 木：性刚果断，常有祸端，有牢狱之灾。\n3 工 木：上下敦睦，一生平凡，保守之格，子孙兴旺，吉祥幸福。\n3 弓 木：抱负大，志气强，有精神失常之灾，杀人被杀之字。\n3 及 木：事劳无功，奔波劳苦，多灾难，出国大吉，晚年享福。\n3 巾 木：刑克父母，刑妻伤子，晚婚大吉，中年隆昌，晚年多灾。\n3 久 木：出国之格，一生清雅荣贵，中年成功隆昌，福寿之字。\n3 口 木：食禄齐美，口才伶俐，重情失败，中年劳神，晚年吉祥。\n3 乞 木：过房之字，少年艰难，中年成功隆昌，双妻之格，晚年劳神。\n3 凡 水：刑偶欠子，一生清贵，出外逢贵得财，子孙兴旺。\n3 亡 水：不祥之字，忌车怕水，恶死凶亡，一生难得幸福。\n3 下 水：刑偶伤子，有才能，奔波劳苦，有晚福。\n3 子 水：智勇双全，清雅荣贵，中年劳，晚年隆昌，女人温和贤淑。\n3 大 火：清雅荣贵，多才精明，中年成功隆昌，富贵荣华，但常人难受。\n3 孓 火：不祥之字，暗淡无光，多劳困苦，事劳无功。\n3 女 火：孤独，刑偶欠子，环境良好，秀气伶俐，晚年劳神。\n3 勺 火：天生聪明，清雅荣贵，环境良好，一生享福，欠子之字。\n3 巳 火：一生清雅多才，刑偶伤子，中年多灾，晚年吉庆。\n3 弋 火：出外逢贵，重义信用，中年多灾，晚年隆昌。\n3 之 火：出国之字，名利双收，学识渊博，官运旺盛，荣贵之字。\n3 己 土：孤独长寿，中年吉庆，晚年忧心劳神或潦倒。\n3 山 土：孤独，父母无缘，少年艰难，中年隆昌，技术大吉，欠子之字。\n3 土 土：技术方面大吉，贵人明现，成功隆昌，环境良好。\n3 丸 土：出外大吉，欠子之字，中年成功隆昌，环境良好。\n3 也 土：奔波劳苦，一生多灾，难得幸福，晚年享福。\n3 于 土：一生清荣，温和贤淑，中年劳神，晚年隆昌。女人薄幸多灾。\n4 仇 金：口快心直，刑偶伤子，中年多灾，晚年享福。\n4 戈 金：杀人被杀，病弱短寿，刑偶伤子，女人多灾，守寡之字。\n4 仁 金：理智充足，重情失败，中年劳，晚年吉祥。\n4 升 金：智勇双全，一生清雅荣贵，幼年多灾，中年成功隆昌。\n4 什 金：事劳无功，忧心劳神，中年多灾，晚年劳神。\n4 氏 金：忍耐勤俭，应付自如，清雅伶俐，中年劳，晚年吉祥。\n4 手 金：性格复杂，多愁少乐，中年多灾，忌车怕水，晚年吉祥。\n4 四 金：幼年辛苦，义利分明，中年奔波隆昌，小心灾厄，忌车怕水。\n4 心 金：孤独，克父，一生安稳享福，有爱情厄，子孙兴旺。\n4 爪 金：忧心劳神，一生多灾，有爱情烦恼，晚年吉祥，忌车怕水。\n4 卞 木：有才能但无好运，潦倒一生。\n4 公 木：声名显赫，富贵增荣，一生享福，但常人难受。\n4 介 木：刑克父母，兄弟无缘，中年劳，晚年成功隆昌，二子吉祥。\n4 今 木：一生清雅荣贵，中年成功隆昌，多才巧智，晚年劳神。\n4 斤 木：清秀巧智，一生清雅荣贵，女人助夫，环境良好。\n4 亢 木：奔波劳苦，忧心劳神，一生困苦，病弱短寿。\n4 孔 木：忧心劳神，怀才不遇，中年劳苦，晚年吉庆。\n4 牛 木：清雅荣贵，一生平凡，子孙兴旺，中年成功隆昌，精诚之字。\n4 欠 木：潦倒困苦，刑偶之字，中年劳，晚年享福。\n4 犬 木：任性或怪性，性刚消极，中年劳，晚年隆昌。\n4 牙 木：秀气巧妙，多才巧智，中年成功隆昌，晚年劳神，平凡之字。\n4 元 木：环境良好，克己助人，福寿兴家，妻贤子贵，荣华之字。\n4 月 木：刑偶欠子，身弱多灾，晚婚大吉，中年劳神，晚年隆昌，平凡之字。\n4 匀 木：聪明伶俐，清雅荣贵，中年成功隆昌，晚年昌盛，二子吉祥。\n4 巴 水：幼年多灾，中年劳苦，晚年隆昌，欠子之字，一生平凡。\n4 比 水：英俊才人，多才巧智，中年虽困苦，成功隆昌，晚年子孙兴旺。\n4 不 水：清雅伶俐，出外逢贵，中年多灾，二子吉祥，女人刑偶伤子，薄幸之字。\n4 歹 水：不祥之字，多灾难，难得幸福，一生困苦，晚年有福。\n4 反 水：奔波劳苦，浮沉不定，常有祸端，短寿之字，杀人或被杀。\n4 方 水：一生安稳，聪明伶俐，中年有灾，晚年幸福。\n4 分 水：刑偶伤子，多才巧智，出外大吉，中年成功隆昌，晚年不吉。\n4 夫 水：天生聪颖，英敏多才，中年奔波，一生清雅荣贵。\n4 父 水：多刑克，病弱短寿，忌车怕水，一生难得成功。\n4 互 水：温和伶俐，清雅聪秀，中年隆昌，为人忠厚，欠子之字。\n4 户 水：清雅伶俐，荣贵隆昌，中年有灾，晚年隆昌。\n4 化 水：技术能成功，有才无运，多劳少乐，中年吉祥，晚年劳神。\n4 幻 水：有爱情烦恼，怀才不遇，中年多灾，晚年吉祥。\n4 毛 水：一生清雅平凡，多才巧智，荣贵之格，中年多灾，晚年吉祥。\n4 匹 水：性刚果断，义利分明，中年有灾，老年吉祥，但劳神。\n4 片 水：刑偶伤子，忧心劳神，一生困苦多灾，晚年享福。\n4 壬 水：一表人才，官格之命，刑妻伤子，中年多劳，晚年吉庆，荣贵之字。\n4 水 水：一生平凡，有才能理智，晚婚大吉，刑偶欠子，晚年隆昌。\n4 文 水：英俊多才，清雅荣贵，中年吉祥隆昌，忌车怕水。\n4 勿 水：暗淡无光，消极冷寒，难得幸福，多灾难，病弱短寿。\n4 尺 火：一生清雅伶俐，多才巧智，中年多灾，晚年吉祥。\n4 丑 火：一生清雅平凡，双妻之格，中年吉庆，晚年劳神，多灾之字。\n4 丹 火：性刚果断，父母无缘，一生平凡，中年劳，晚年吉祥。\n4 吊 火：不祥之字，身弱短寿，病苦一生，忌车怕水，多灾难。\n4 斗 火：理智充足，出外大吉，中年劳，晚年成功隆昌。\n4 火 火：性刚果断，中年有灾难，病凶恶煞，晚年隆昌。\n4 井 火：勤俭励业，义利分明，中年多劳，晚年幸福。\n4 内 火：温和贤淑，贵人明现，环境良好，中年成功隆昌。\n4 日 火：刑克父母，刑偶欠子，理智充足，智勇双全，成功隆昌。\n4 太 火：刑克父母，孤独，清雅伶俐，中年成功隆昌，欠子之字。\n4 天 火：刑克父母，刑偶欠子，双妻之格，出外大吉，晚年吉祥。\n4 屯 火：多刑克，晚婚大吉，中年多灾，晚年吉祥，享福之字。\n4 午 火：食禄齐美，环境良好，中年奔波，晚年吉庆。\n4 支 火：贵人明现，有才能理智，但中年劳苦，晚年隆昌。\n4 止 火：忧心劳神，事劳无功，身弱多灾，中年劳，晚年吉祥。\n4 中 火：幼年多灾，出外逢贵，精明公正，福寿兴家，晚年劳神。\n4 厄 土：不吉之字，多灾难，难得幸福，潦倒一生。\n4 切 土：英俊佳人，双妻之格，中年奔波但隆昌，晚年劳神。\n4 王 土：一生清雅荣华，刑偶伤子，双妻之格，中年奔波，成功隆昌。\n4 尹 土：一生清雅伶俐，多才多艺，智勇双全，荣幸之字。\n4 引 土：性刚果断，侠义心肠，有成人之美德，中年成功隆昌，晚年劳神。\n4 尤 土：一生清雅伶俐，刑偶伤子，中年劳，晚年隆昌，忌车之字。\n4 友 土：多情重义，理智充足，中年奔波，成功隆昌。\n4 予 土：有爱情烦恼，一生多灾，中年多劳，晚福之字。\n4 曰 土：一生清雅，中年劳，晚年吉祥，环境良好，女人刑夫靠子之字。\n4 允 土：六亲无缘，出外逢贵得财，天生聪颖，自力更生，白手成家。\n5 册 金：良善积德，环境良好，特有人缘，中年成功隆昌。\n5 出 金：性刚果断，少年艰难，中年多灾，晚年吉祥，忌车怕水。\n5 刊 金：刑偶伤子，损丁多灾，中年劳，晚年幸福，女人多灾，再嫁之字。\n5 尻 金：出外大吉，多刑克，中年开运，晚年吉祥。\n5 仟 金：清雅荣贵，环境良好，中年成功隆昌，晚年子孙兴旺。\n5 且 金：义利分明，一生清雅伶俐，名利双收，二子吉祥。\n5 申 金：一生清雅荣贵，多才巧智，中年成功隆昌，欠子之字。\n5 生 金：智勇双全，出外逢贵得财，中年成功隆昌，荣贵之字。\n5 失 金：忧心劳神，沉浮不定，刑妻伤子，一生难得幸福，多疾病。\n5 石 金：刑偶伤子，命硬，中年奔波，晚年隆昌，双妻之格。\n5 史 金：一生福禄有余，中年多厄，晚年隆昌，吉祥之字。\n5 矢 金：性刚果断，事劳无功，多刑克，子孙兴旺。\n5 世 金：操守廉正，福禄双收，中年勤俭建业，晚年隆昌。\n5 仕 金：义利分明，多才巧智，中年成功隆昌，晚年劳神，多疾之字。\n5 市 金：幼年辛苦，少年艰难，晚年隆昌，女人薄幸。\n5 示 金：理智充足，天生聪明，一生清雅荣贵，环境良好，双妻之格，中年成功隆昌。\n5 司 金：妻贤子贵，天赐福禄，一生清雅荣贵，成功隆昌。\n5 仙 金：环境良好，清雅伶俐，温和豪爽，中年成功，双妻之格，幸福之字。\n5 占 金：幼年多灾，忌火，有才能理智，食禄齐美，成功隆昌。\n5 正 金：才智卓越，精明公正，官运或财运旺，刑偶伤子。\n5 主 金：兄弟无靠，一生清雅多智，环境良好，中年劳，晚年隆昌。\n5 本 木：温和贤淑，环境良好，一生平凡，中年多灾，晚年吉庆。\n5 甘 木：一生多巧智，中年多灾，晚年隆昌，名利双收，豪爽之字。\n5 功 木：父母无缘，孤独奔波，一生清雅荣贵，多才巧智，晚年劳神。\n5 古 木：温和贤淑，食禄双全，中年奔波，晚年吉祥。\n5 瓜 木：忧心劳神，孤独格，中年多灾，晚年吉祥。\n5 卉 木：忧心劳神，损丁破财，潦倒一生，忌车怕水。\n5 加 木：技术界大吉，出外逢贵，中年奔波，晚年隆昌，幸福之字。\n5 甲 木：一生清雅伶俐，温和贤淑，中年成功隆昌，环境良好。\n5 句 木：衣食丰足，肯做肯劳，重信用，中年劳，晚年隆昌。\n5 巨 木：怀才不遇，忧心劳神，外观幸福，内心多愁，晚年享福。\n5 可 木：福禄双收，天生聪颖，离祖成功，双妻之格，晚年隆昌。\n5 卯 木：刑偶或欠子，清雅温和，重情重义，中年多灾，晚年隆昌。\n5 巧 木：少年艰难，忌车怕水，中年劳，晚年吉庆。\n5 丘 木：智勇双全，环境良好，中年成功隆昌，晚年劳神。\n5 去 木：消极不吉，一生清雅多灾厄，中年小心，晚年吉祥。\n5 外 木：刑偶伤子，双妻之格，出外逢贵得财，中年劳，晚年吉祥。\n5 五 木：多才巧智，天生聪颖，中年成功隆昌，安享荣贵，晚年劳神。\n5 玉 木：智勇双全，刑偶伤子，名利双收，荣贵隆昌，女人病弱，有爱情厄，欠子之字。\n5 札 木：英敏佳人，一生清雅荣贵，中年成功隆昌，双妻之格。\n5 半 水：多愁善感，不惹是非，中年劳，晚年幸福，女人半夫半财。\n5 白 水：清秀伶俐，智勇双全，中年成功，有爱情厄，晚年吉庆。\n5 包 水：一生清雅伶俐，谋为出众，中年成功隆昌，晚年劳神。\n5 北 水：环境良好，一生清雅荣贵，中年成功隆昌，晚年劳神。\n5 必 水：身弱奔波，出外吉庆，刑偶伤子，晚婚隆昌，晚年吉庆，事业如意。\n5 弁 水：有才能谋略，难成功，重情失败，晚年享福。\n5 布 水：温和慈祥，但多灾难，忌车怕水，中年劳，晚年吉祥。\n5 匆 水：忧心劳神，一生多灾，身弱多病，难得幸福，多灾难。\n5 兄 水：口快心直，奔波劳苦，保守平凡，中年吉祥。\n5 弗 水：多刑克，幼年辛苦，中年有成就，有牢狱之灾。\n5 付 水：虽然隆昌，一生暗淡，或身体不利，欠子之字，中年劳，晚年幸福。\n5 夯 水：幼年辛苦，忌车怕水，中年奔波，晚年吉祥。\n5 禾 水：出国之格，一生衣禄丰厚，清雅英俊，中年成功隆昌。\n5 弘 水：口快心直，一生清雅，忌车怕水，中年多灾，晚年隆昌。\n5 矛 水：性刚果断，一生多灾，中年劳，晚年吉祥。\n5 民 水：英俊佳人，上下敦睦，一生官或财旺，刑偶伤子。\n5 皿 水：刑偶伤子，一生清雅多才，中年薄幸，晚年吉祥。\n5 末 水：多忧少乐，潦倒一生，中年多灾，晚年吉祥，忌车怕水。\n5 母 水：刑克父母，幼年辛苦，中年成功隆昌，晚年忧心劳神。\n5 目 水：忧心劳神，浮沉不定，中年多灾，晚年吉庆，虽成功亦劳神。\n5 丕 水：清雅伶俐，温和诚实，迟婚大吉，一生清闲幸福。\n5 皮 水：奔波劳苦，事劳无功，一生多灾难，幸福之字。\n5 平 水：教育界大吉，一生安稳守己，克己助人，温和贤淑。\n5 玄 水：性格复杂，中年离乱，晚年吉祥，子孙繁荣，官运旺。\n5 穴 水：安稳守己，环境良好，有才能理智，成功隆昌，二子吉祥。\n5 疋 水：身闲心苦，事劳无功，刑偶伤子，有爱情厄，晚福之字。\n5 印 水：一生清雅荣贵，幼年辛苦，中年成功隆昌，晚年劳神。\n5 丙 火：英俊佳人，环境良好，官格之字，中年成功隆昌。\n5 代 火：清秀伶俐，小巧多才，晚婚大吉，出外逢贵，上下敦睦，温和之字。\n5 旦 火：贵人明现，子孙兴旺，多才巧智，环境良好之字。\n5 叮 火：潦倒一生，忧心劳神，口是心非，苦不离身，晚年享福。\n5 冬 火：暗淡无光，命运多舛，中年多灾，晚年有福。\n5 立 火：病弱短寿，少年艰难，中年隆昌，二子吉祥，忌车祸之字。\n5 令 火：英雄豪爽，上下敦睦，中年奔波，成功隆昌，温和之字。\n5 另 火：出外逢贵得财，克母命，福禄双收，中年奔波，晚年成功。\n5 尼 火：暗淡无光，事难如愿，中年忧心劳神，晚年吉祥。\n5 奴 火：多愁多忧，百事苦劳，身闲心苦，潦倒一生，晚年吉祥。\n5 冉 火：清雅伶俐，多才巧智，义利分明，中年有病厄，一生安稳。\n5 他 火：出外逢贵得财，温和多才，忌车怕水，晚年隆昌。\n5 田 火：福寿兴家，才能理智兼备，中年劳，晚年隆昌，环境良好。\n5 召 火：带刀厄，多刑克，刑偶欠子，中年成功隆昌，离祖成功。\n5 只 火：忧心劳神，二子吉祥，中年多灾，晚年吉祥。\n5 左 火：理智充足，胆识豪杰，一生清雅荣贵，温和隆昌，忌车怕水。\n5 瓦 土：身犯破，忧心劳神，中年劳，身弱短寿，晚年隆昌。\n5 戊 土：性刚果断，一生清雅多才，中年有爱情厄，晚年吉庆。\n5 央 土：一生清雅伶俐，多才巧智，中年有爱情厄，晚年隆昌。\n5 以 土：聪明伶俐，一生清雅享福，中年成功隆昌，欠子之字。\n5 永 土：克父命，出外逢贵得财，中年奔波，晚年隆昌，荣幸之字。\n5 用 土：忧心劳神，温和机警，奔波后成功隆昌，子孙兴旺。\n5 由 土：英雄豪爽，清雅多才，双妻之格，中年劳，晚年隆昌。\n5 右 土：学识丰富，克己助人，中年成功隆昌，官格之命，操守廉正。\n5 幼 土：多灾厄，难关重重，一生难得幸福，有不幸之灾，晚年吉祥。\n5 仔 土：忧心劳神，一生难如愿，中年多灾，晚年吉祥。\n6 臣 金：清雅伶俐，多才巧智，精明公正，义利分明，中年多灾，晚年隆昌。\n6 丞 金：理智充足，胆识丰富，一生清雅伶俐，成功荣贵，欠子之字。\n6 此 金：奔波劳苦，难忘如愿，命途多舛，潦倒一生，晚福之字。\n6 次 金：身瘦或体弱，出外大吉，技术成功，多才温和。\n6 存 金：天生聪明，义利分明，子孙兴旺，中年劳，晚年隆昌。\n6 而 金：出国之字，秀气英敏，中年成功隆昌，多才伶俐，荣贵之字。\n6 吏 金：有才能理智，难遇知己，中年劳苦，晚年安详。\n6 列 金：性刚果断，幼年辛苦，中年多劳，出外大吉，晚年隆昌。\n6 任 金：环境良好，官格之字，学识渊博，中年成功隆昌。\n6 如 金：理智充足，多才温和，有爱情烦恼，中年多灾，秀气短寿。\n6 色 金：忧心劳神，少年艰难，中年多灾，晚年享福。\n6 舌 金：一生多劳受苦，身弱多病，中年多灾，晚年隆昌。\n6 式 金：有才能理智，中年多灾或潦倒，晚年荣幸。\n6 守 金：刑偶伤子，精明公正，中年隆昌，女人薄幸，疾病多灾。\n6 死 金：不祥之字，暗淡无光，多灾难，难得幸福，恶死凶亡之字。\n6 寺 金：刑偶伤子，事劳无功，中年清雅荣贵，晚年吉祥。\n6 夙 金：出国之格，天生聪颖，多才巧智，有爱情厄，中年成功隆昌。\n6 西 金：事劳无功，忧心劳神，中年隆昌，中年小心，晚年隆昌。\n6 先 金：出外逢贵得财，刑偶伤子，中年劳，晚年吉庆。\n6 旬 金：晚婚迟得子大吉，身弱清秀，多才贤能，晚年隆昌，欠子之字。\n6 曳 金：性刚果断，一生难如愿，潦倒一生，晚年吉祥，享福之字。\n6 再 金：多才巧智，贵人明现，中年成功隆昌，女人薄幸。\n6 在 金：奔波劳苦，性刚果断，中年多灾，福禄双收，晚年隆昌。\n6 早 金：环境良好，一生清雅秀气，二子吉祥，中年吉庆，晚年忧心劳神。\n6 州 金：克父命，克偶伤子，中年多灾，晚年吉庆。\n6 舟 金：沉浮不定，是非参半，晚婚大吉，中年多灾，吉祥之字。\n6 字 金：有爱情烦恼，安稳守己，中年有灾难，晚年吉庆。\n6 各 木：性刚果断，口快心直，中年劳苦，晚年吉祥。\n6 共 木：环境良好，一生清雅荣贵，二子吉祥，中年成功隆昌。\n6 吉 木：不吉之字，忧心劳神，有牢狱之灾，有爱情厄，晚年吉祥。\n6 伎 木：忧心劳神，病弱短寿，一生劳苦，多灾难。\n6 件 木：忧心劳神，一生难得幸福，命运多舛，劳苦多灾。\n6 交 木：多刑克，身弱多病，性刚多灾，中年劳，难得成功。\n6 伉 木：多愁多忧，百事苦劳，中年多灾，晚年隆昌。\n6 考 木：一生清雅平凡，出外吉祥，中年劳苦，晚年成功隆昌。\n6 匡 木：刑克父母，幼年辛苦，中年成功隆昌，晚年忧心劳神。\n6 企 木：环境良好，坚实温和，中年成功隆昌，清雅荣贵。\n6 曲 木：理智充足，多才温和，有爱情厄，中年奔波劳苦，晚年吉祥。\n6 戎 木：多愁善感，性刚果断，一生多灾，晚年虽吉亦劳神。\n6 朽 木：有才能理智，中年多灾，晚年安详。\n6 旭 木：幼年辛苦，出外吉庆，中年奔波，成功隆昌，子孙兴旺。\n6 仰 木：聪明伶俐，多才巧智，交际巧妙，中年成功隆昌，晚年子孙繁荣。\n6 朱 木：清雅伶俐，天生聪颖，多才巧智，中年隆昌，有爱情厄，晚年吉庆。\n6 竹 木：一生清雅伶俐，多才巧智，中年隆昌，晚年子孙旺盛。\n6 百 水：理智充足，食禄齐美，一生多才巧智，成功隆昌，环境良好。\n6 冰 水：忧心劳神，事劳无功，中年有灾，晚年吉祥。\n6 并 水：多才多能，义利分明，克己助人，中年成功隆昌，二子吉祥。\n6 伐 水：百事劳苦，一生清雅平凡，刑偶伤子，有子亦不肖，晚年吉庆。\n6 刑 水：多刑克，忧心劳神，事劳无功，一生多灾难，难得幸福。\n6 行 水：温和贤淑，清雅伶俐，中年多病，晚年隆昌。\n6 凶 水：不祥之字，暗淡无光，杀人被杀，有牢狱之灾，难得幸福。\n6 休 水：忧心劳神，身弱多病，中年潦倒，难得成功，晚年享福。\n6 帆 水：有爱情厄或刑偶伤子，中年劳或奔波，晚年隆昌，英俊之字。\n6 仿 水：贵人明现，一生清雅伶俐，中年劳苦多灾，晚年安宁幸福。\n6 妃 水：清雅贵气，理智充足，一生清闲享福，晚年劳神。\n6 伏 水：英雄气概，一生性刚有美德，中年多灾，晚年隆昌。\n6 亥 水：清雅伶俐，出外逢贵得财，中年劳，晚年隆昌，环境良好。\n6 好 水：秀气伶俐，上下敦睦，有才能理智，温和贤淑，一生幸福之字。\n6 合 水：环境良好，一生清雅温和，中年励业，晚年成功隆昌。\n6 回 水：环境良好，性格朴素，有美德，中年成功隆昌，晚年身弱。\n6 米 水：天生聪颖，多才巧智，出外大吉，中年平凡，晚年隆昌。\n6 名 水：出外逢贵得财，中年奔波劳苦，但名利双收，晚年吉祥。\n6 牟 水：聪明伶俐，多才巧智，但怀才不遇，多灾难，晚年吉祥。\n6 牝 水：性刚果断，自我心强，有牢狱之灾，中年多灾，晚年吉祥。\n6 收 水：忧心劳神，一生劳苦，潦倒多灾，女人再嫁、守寡。\n6 汀 水：身弱多病，多忧少乐，中年劳，晚年吉祥。\n6 向 水：衣厚食丰，清雅平凡，中年忧心劳神，晚年吉庆。\n6 血 水：一生清雅伶俐，刑偶伤子，中年有爱情厄，晚年安稳。\n6 弛 火：侠义心强，慷慨豪爽，中年多劳，晚年吉祥。\n6 打 火：事劳无功，怀才不遇，中年辛苦中得甘，子孙兴旺。\n6 多 火：克服万难后方能成功，多才贤能，重情失败，晚年隆昌。\n6 耳 火：一生清雅伶俐，幼年辛苦，刑偶伤子，中年多灾，晚年享福。\n6 亘 火：出国之字，智勇双全，义利分明，中年成功隆昌。\n6 光 火：一生清雅荣贵，晚婚大吉，出外逢贵得财，中年平凡，晚年吉庆。\n6 尖 火：刑偶伤子，多刑克，吉凶参半，中年多灾，晚年隆昌。\n6 匠 火：刑克父母，少年艰难，中年多劳，多才巧智，晚年成功隆昌。\n6 决 火：清秀巧妙，多才伶俐，中年吉祥，晚年劳神，多灾厄。\n6 老 火：一生清雅平凡，中年多劳，晚年吉祥隆昌。\n6 劣 火：不祥之字，孤独劳苦，多刑克，中年多灾，晚年享福。\n6 六 火：性刚果断，贵人明现，中年奔波劳苦，晚年隆昌，荣幸之字。\n6 年 火：刑克父母，一生多才多能，中年劳，晚年成功隆昌。\n6 全 火：多才巧智，清雅荣贵，中年劳，成功隆昌，名利双收之字。\n6 肉 火：一生清雅平安，清闲伶俐，中年虽劳，晚年吉祥隆昌。\n6 同 火：刑偶欠子，清雅多才，温和贤能，中年劳，晚年隆昌。\n6 宅 火：出外吉祥，一生多才贤能，子孙旺盛，中年成功，晚年吉庆。\n6 兆 火：出国之字，清雅荣贵，天生聪颖，中年成功隆昌，名利双收。\n6 旨 火：晚婚迟得子大吉，一生清雅伶俐，中年多劳，晚年吉祥。\n6 至 火：英雄慷慨，性刚多灾，中年劳，晚年吉祥。\n6 仲 火：刑偶伤子，性刚灵活机敏，中年有灾难，晚年吉祥，双妻之格。\n6 自 火：有爱情厄，少年艰难，中年劳苦，疾病短寿，晚年吉庆。\n6 安 土：安详平凡，一生清雅，口快性刚，克父命，子孙兴旺，幸福之字。\n6 充 土：奔波劳苦，一生温和贤能，出外大吉，中年成功隆昌。\n6 地 土：一生清雅，刑偶欠子，刑克父母，中年隆昌但有病灾或劫财，晚年吉庆。\n6 艮 土：性刚，出外大吉，一生清雅，中年劳，晚年吉祥。\n6 圭 土：天性聪明，多才巧智，义利分明，刑偶伤子，中年劳，晚年成功。\n6 灰 土：口快心直，性刚果断，中年多灾，晚年吉祥。\n6 似 土：有才有能，清雅荣贵，中年成功隆昌，出国之字。\n6 伍 土：英俊佳人，理智充足，勤俭励业，名利双收，荣幸之字。\n6 戌 土：英俊灵活，多才巧智，幼年辛苦，中年隆昌，欠子之字。\n6 羊 土：一生清雅温和，晚婚迟得子大吉，中年奔波，晚年吉祥。\n6 伊 土：一生清雅荣贵，理智充足，中年成功隆昌，上下敦睦。\n6 衣 土：出外吉祥，忧心劳神，中年多灾，晚年吉祥。\n6 夷 土：性刚果断，口快心直，有牢狱之灾，晚年享福。\n6 亦 土：出国之格，出外逢贵得财，中年成功隆昌，秀气荣贵。\n6 因 土：多劳受苦，忧心劳神，性刚有牢狱之灾，晚福之字。\n6 有 土：半财之格，一生清雅伶俐，性刚果断，中年劳苦，晚年隆昌。\n6 宇 土：一生清雅平凡，中年奔波劳苦，理智充足，晚年吉祥，忌车怕水。\n6 羽 土：秀气伶俐，一生温和贤淑，中年成功隆昌，名利之字。\n6 圳 土：性刚口快，中年多灾，忌车怕水，晚年吉祥。\n7 车 金：口快心直，性刚果断，中年奔波劳苦，晚年吉祥。\n7 成 金：清秀多才，出外或出国大吉，晚婚隆昌，中年成功。\n7 赤 金：口快心直，性刚，出外吉利，晚婚吉，中年隆昌，晚年劳神。\n7 串 金：多愁多忧，事劳无功，身弱多病，中年多灾，晚福之字。\n7 吹 金：忧心劳神，奔波劳苦，中年多灾，晚年享福。\n7 兑 金：福禄双收，清雅荣贵，二子吉祥，贵人明现，晚年吉庆。\n7 束 金：刑偶伤子，二子吉祥，中年吉庆幸福，晚年劳神。\n7 判 金：忧心劳神，百事苦劳，中年多灾，晚年吉祥。\n7 七 金：忧心劳神，困苦一生，刑偶伤子，病弱短寿，晚年享福。\n7 忍 金：有爱情烦恼，忧心劳神，身弱多厄，中年吉祥，晚年多灾。\n7 妊 金：良善积德，温和贤淑，名利双收，成功隆昌，名利之字。\n7 伸 金：智勇双全，名利双收，中年劳，多灾难，晚年吉昌。\n7 身 金：性刚果断，忧心劳神，病弱短寿，中年劳，晚年吉祥。\n7 私 金：刑偶伤子，忧心劳神，忍耐力强，身闲心劳，晚年吉庆。\n7 伺 金：理智充足，清雅伶俐，贵人明现，刑偶伤子，荣贵之字。\n7 宋 金：一生清雅，智勇双全，中年奔波，晚年隆昌。\n7 忒 金：多才巧智，温和贤能，中年多灾，晚年隆昌，荣幸之字。\n7 辛 金：多才巧智，清雅荣贵，中年成功隆昌，出国之字。\n7 秀 金：有爱情烦恼，秀气巧妙，吉凶分明，荣幸之字。\n7 序 金：温和贤淑，清雅秀气，福禄双收，中年多灾，环境良好，出国之字。\n7 巡 金：奔波劳苦，身闲心苦，中年成功隆昌，晚年兴旺。\n7 酉 金：病弱短寿，晚婚迟得子大吉，中年多灾，晚年隆昌。\n7 助 金：清雅荣贵，双妻之格，中年成功隆昌，晚年多忧。\n7 妆 金：清雅伶俐，多才贤能，中年吉祥，晚年隆昌，环境良好。\n7 壮 金：双妻之格，刑偶伤子，晚婚吉利，中年成功隆昌，晚年劳神，忌车怕水。\n7 孜 金：秀气多才，出国之格，有爱情烦恼，中年成功隆昌。\n7 走 金：奔波劳苦，清雅伶俐，中年劳，晚年吉昌，双妻之格。\n7 佐 金：学识丰富，智勇双全，清雅荣贵，一生享福，温和长寿。\n7 作 金：忧心劳神，刑偶欠子，中年隆昌，晚年劳神，一生劳苦。\n7 坐 金：刑克父母，精诚和睦，中年多灾，晚年吉祥。\n7 材 木：智勇双全，刑偶欠子，清雅荣贵，官运旺，环境良好。\n7 岑 木：福禄双收，多刑克，晚婚吉，中年劳，晚年昌盛。\n7 村 木：忧心劳神，奔波劳苦，中年吉祥多病，晚年劳神多厄。\n7 杏 木：有爱情烦恼，刑偶伤子，中年平凡，晚年劳神，但安详之字。\n7 改 木：出外逢贵得财，清雅多才，中年艰苦，晚年隆昌。\n7 杆 木：性刚果断，忌车怕水，中年多灾，晚年隆昌。\n7 告 木：英俊多才，名利有份，中年奔波，晚年隆昌。\n7 更 木：一生聪明伶俐，离祖成功，晚婚迟得子大吉，福禄双收，成功吉昌，欠子之字。\n7 攻 木：奔波劳苦，百事苦劳，一生多灾，病弱短寿。\n7 估 木：温和伶俐，多才巧智，中年多灾，晚年吉祥，荣幸之字。\n7 谷 木：二子吉祥，清雅荣贵，福禄双收，中年多灾，环境良好，出国之字。\n7 旱 木：不祥之字，忌车怕水，中年奔波，晚年吉祥。\n7 何 木：福禄双收，但忧心劳神，中年多灾，身弱多病，晚年吉祥。\n7 妓 木：快乐一生，内心多忧，中年吉祥，晚年劳神。\n7 忌 木：重情失败，忧心劳神，身弱多病，晚年享福。\n7 见 木：出外逢贵得财，性刚欠仁和，中年劳，晚年大吉，刑克父母。\n7 角 木：性刚果断，常有祸端，有牢狱之灾，晚年享福。\n7 劫 木：带刀多刑，一生多灾厄，一贫如洗，难得幸福，终生不幸。\n7 妗 木：温和贤淑，勤俭守己，福寿兴家，中年劳神，晚年隆昌。\n7 究 木：理智充足，义利分明，中年隆昌，晚年吉庆享福。\n7 局 木：外观幸福，内心多忧，中年多灾，晚年吉祥，忌车厄之字。\n7 君 木：有爱情烦恼，一生清雅，多才巧智，秀气伶俐，中年有灾，晚年吉庆。\n7 克 木：多刑克，命硬，刑偶伤子，有官运，一生平凡。\n7 困 木：忧心劳神，损丁破财，中年吉祥，晚年劳神，困苦之字。\n7 弃 木：忧心劳神，事劳无功，中年多灾，一生难得幸福。\n7 却 木：刑偶伤子，天生聪明，多才伶俐，成功荣贵，女人多灾。\n7 杉 木：口快心直，多才巧智，杀人或被杀，有牢狱之灾。\n7 我 木：奔波劳苦，忧心劳神，多才巧智，刑偶伤子，晚年吉祥。\n7 吴 木：一生清雅多才，中年多灾，晚年吉祥。\n7 吾 木：智勇双全，义利分明，重情失败，中年多劳，晚年吉庆。\n7 言 木：重情重义，温和聪颖，中年成功隆昌，晚年倍加昌盛。\n7 吟 木：温和贤淑，勤俭励业，福禄双收，成功隆昌，忠厚善良，名利裕如。\n7 杖 木：志气高，抱负大，欠仁和，中年隆昌，家庭不和，晚年劳神。\n7 伴 水：精神失常，性刚口快，中年多灾，一生难得幸福，抱恨九泉。\n7 贝 水：出外吉庆，多才巧智，中年隆昌，二子吉祥。\n7 妣 水：义利分明，秀气巧妙，勤俭起家，中年隆昌，荣华之字。\n7 别 水：刑偶伤子，晚婚吉，清雅伶俐，中年有离乱之灾，晚年安详。\n7 兵 水：二子吉祥，内心多忧，中年多灾，晚年吉祥。\n7 伯 水：多才巧智，义利分明，克己助人，英俊佳人，一生幸福。\n7 步 水：福禄双收，克父命，中年成功隆昌，二子吉祥，晚年劳神，身弱之字。\n7 池 水：事业隆昌，环境良好，离祖成功，中年平凡，晚年吉庆。\n7 呆 水：精神失常，忧心劳神，晚婚吉，中年劳，晚年享福。\n7 形 水：清雅伶俐，多刑克父母，中年劳，晚年隆昌。\n7 妨 水：秀气巧妙，清雅伶俐，中年吉祥，晚年劳神。\n7 佛 水：温和慈祥，清雅荣贵，中年成功隆昌，晚年劳神。\n7 否 水：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n7 孚 水：精明公正，智勇双全，福寿兴家，中年成功隆昌，欠子之字。\n7 甫 水：多才巧智，清雅伶俐，中年难成功，多灾难，晚年吉祥。\n7 含 水：福禄双收，名利裕如，多才巧智，中年成功隆昌。\n7 罕 水：一生多灾厄，刑偶伤子，忧心劳神，命运多舛。\n7 汗 水：幼年辛苦，清雅伶俐，双妻之格，中年有灾难，晚年吉祥。\n7 亨 水：多才伶俐，晚婚吉，中年虽劳，成功隆昌，幸福清闲。\n7 宏 水：一生清雅，晚婚迟得子大吉，多才巧智，中年不利，晚年吉昌。\n7 即 水：性刚果断，口快心直，中年多劳，晚年吉祥。\n7 江 水：清雅多才，中年劳苦，晚年吉祥，女人性刚，忌车怕水，中年多灾。\n7 戒 水：忧心劳神，事劳无功，杀人被杀，恶死凶亡之字。\n7 况 水：奔波劳苦，病弱短寿，中年多灾，晚年享福。\n7 冷 水：不祥之字，暗淡无光，命途多舛，中年劳，晚年隆昌。\n7 忙 水：病弱短寿，损丁破财，灾难不离身，一生多劫煞。\n7 尨 水：英雄豪爽，有牢狱之灾，中年多灾，晚年吉祥。\n7 每 水：身弱多病，事劳无功，中年勤俭励业，成功隆昌。\n7 妙 水：幼年辛苦，少年艰难，中年成功隆昌，女人中年劳，晚年吉祥。\n7 汝 水：出国之格，清雅秀丽，温和伶俐，中年成功隆昌，荣贵之字。\n7 忘 水：忧心劳神，损丁破财，终生不幸，不能完寿。\n7 尾 水：忧心劳神，刑偶伤子，薄幸多灾，中年小心，不幸之字。\n7 希 水：虽清雅荣贵，多才巧智，但运徒不通，中年有灾，晚婚吉，晚年吉庆。\n7 孝 水：多才巧智，一生清雅荣贵，中年有灾，晚年吉庆。\n7 汛 水：出国之字，英俊秀气，温和贤淑，中年成功隆昌，有爱情厄。\n7 妤 水：秀气巧妙，清雅伶俐，福禄双收，荣贵隆昌，欠子之字。\n7 呈 火：学识渊博，清雅荣贵，官或财旺，但常人难受。\n7 但 火：义利分明，多才有能，中年劳或奔波，晚年吉昌。\n7 低 火：为人机敏，克己助人，中年有灾，晚年隆昌，荣幸之字。\n7 弟 火：英俊秀气，出外吉庆，中年劳，晚年隆昌。\n7 佃 火：福禄双收，环境良好，温和贤淑，中年成功隆昌，荣贵之字。\n7 甸 火：晚婚迟得子大吉，小心爱情厄，中年成功隆昌，出国之字。\n7 豆 火：二子吉祥，多才伶俐，清雅荣贵，白手成家，晚年隆昌荣贵。\n7 伶 火：清雅秀气，多才温和，幼年多灾，中年成功隆昌，荣贵之字。\n7 免 火：刑偶欠子，出外吉祥，中年有灾，晚年吉祥，不幸之字。\n7 灸 火：性刚果断，病弱短寿，中年劳，有牢狱之灾，晚年吉祥。\n7 牢 火：安稳守己，勤俭励业，中年成功，家声克振，幸福之字。\n7 李 火：一生清雅多才，贵人明现，重情失败，中年劳，晚年隆昌。\n7 里 火：清秀多才，理智充足，中年成功隆昌，秀气发福。\n7 利 火：刑偶伤子，少年艰难，中年劳，但成功隆昌，名利之字。\n7 良 火：口快多才，清雅荣贵，出外大吉，中年平，晚年隆昌。女人刑夫伤子。\n7 吕 火：一生清雅，上下敦睦，衣厚食丰，一生清闲享福。\n7 卵 火：二子吉祥，清雅伶俐，肯做肯劳，勤俭持家，晚年享福。\n7 男 火：晚婚迟得子大吉，英俊佳人，中年平凡，晚年吉庆，幸福之字。\n7 弄 火：多才巧智，有爱情厄，中年多灾，晚年吉祥。\n7 努 火：多刑克，性刚果断，忌车怕水，中年多灾，难得幸福。\n7 求 火：一贫如洗，孤苦一生，难得幸福，多灾厄。\n7 町 火：清秀多才，温和伶俐，中年隆昌幸福，晚年多忧。\n7 佟 火：不祥劳苦之字，暗淡无光，一生多劳苦，子孙兴旺。\n7 彤 火：多才巧智，心直口快，清雅荣贵，中年平，晚年大吉。\n7 吞 火：口快心直，欠仁和，有饶舌之灾，中年多难，晚年吉祥。\n7 托 火：义利分明，清雅多才，中年劳或奔波，晚年吉祥隆昌。\n7 妥 火：清秀伶俐，多才温和，秀气巧妙，中年成功隆昌，晚年倍加隆昌。\n7 巫 火：二子吉祥，清雅多才，中年多灾，晚年吉祥。\n7 住 火：重信讲义，多才温和，中年多灾，晚年隆昌。\n7 足 火：刑偶伤子，身弱短寿，中年隆昌，晚年劳神。\n7 坂 土：清雅多才，英敏伶俐，重情失败，晚年吉庆，隆昌之字。\n7 辰 土：英俊佳人，理智充足，一生清雅，出外吉庆，成功荣幸。\n7 坊 土：外观幸福，内心多忧，有才能无运，中年多劳，晚运吉祥。\n7 均 土：天生聪明，多才巧智，清雅荣贵，成功隆昌，名利双收。\n7 坑 土：忧心劳神，事劳无功，一生多灾难，难得幸福，身弱多病。\n7 牡 土：克父命，秀气伶俐，福禄双收，有爱情厄，一生荣幸，二子吉祥。\n7 坍 土：多才巧智，中年成功隆昌，刑偶伤子，晚年劳神。\n7 秃 土：忧心劳神，身弱犯破，病弱短寿，中年多灾，晚年享福。\n7 完 土：清雅伶俐，出外逢贵隆昌，中年有灾，晚年吉祥。\n7 位 土：义利分明，多才巧智，身弱短寿，晚年成功隆昌。\n7 延 土：英雄豪杰，奔波后成功，多才多能，有官格，中年隆昌之字。\n7 役 土：多刑克，刑偶伤子，出外吉庆，中年潦倒，晚年吉祥。\n7 邑 土：一生清雅，秀气温和，中年潦倒，晚年吉昌。\n7 攸 土 ：天生聪明，温和贤淑，中年吉祥，身弱多灾，晚年隆昌。\n7 佑 土：学识丰富，清雅荣贵，中年成功隆昌，名利双收。\n7 余 土：天生聪明，名利有份，中年成功隆昌，晚年享福。\n8 昌 金：口快心直，性刚，忌车怕水，中年劳，晚年成功隆昌，荣贵官旺。\n8 抄 金：忧心劳神，有爱情烦恼，中年劳或潦倒，晚年吉祥。\n8 忱 金：忧心劳神，奔波劳苦，怀才不遇，中年劳苦，晚年吉祥。\n8 承 金：精明公正，多才多能，中年成功隆昌，环境良好。\n8 初 金：刑偶伤子，清雅荣贵，迟婚吉，中年奔波劳苦，晚年隆昌。\n8 垂 金：义利分明，天生聪明，中年成功隆昌，清雅荣贵。\n8 刺 金：身弱多疾，潦倒一生，有才无能，中年劳，晚年享福。\n8 儿 金：奔波劳苦，清雅荣幸，中年劳，成功隆昌，晚年子孙兴旺。\n8 姓 金：多才巧智，清雅伶俐，中年隆昌，环境良好，荣贵之字。\n8 庚 金：一生安稳，天生聪颖，多才伶俐，中年成功隆昌，环境良好。\n8 金 金：有爱情厄，多才秀气，清雅伶俐，中年劳，晚年成功隆昌。\n8 净 金：清雅荣贵，克己助人，中年成功隆昌，出国之字。\n8 侃 金：怀才不遇，命运多舛，中年多灾，晚年吉祥。\n8 刻 金：带刀厄，多刑克，病弱短寿，困苦一生，晚年享福。\n8 孥 金：多愁劳苦，刑偶伤子，中年劳，晚年吉祥。\n8 妻 金：忧心劳神，百事劳苦，刑偶伤子，暗淡之字。\n8 青 金：刑偶欠子，口快性刚，中年吉祥隆昌，晚年劳神。\n8 取 金：刑偶伤子，出外逢贵得财，双妻之格，中年劳，晚年隆昌。\n8 刹 金：不祥之字，暗淡无光，一生多灾，难得幸福，病弱短寿。\n8 姗 金：多才巧智，清雅伶俐，秀气巧妙，中年成功隆昌，出国之字。\n8 尚 金：理智充足，温和清雅，福禄双收，荣贵隆昌，二子吉祥。\n8 舍 金：福禄双收，名利有份，中年吉昌，环境良好，荣贵之字，忌车怕水。\n8 社 金：刑偶伤子，清雅多才，勤俭励业，家声克振，晚年劳神。\n8 使 金：出外逢贵得财，温和贤淑，忧心劳神，上下敦睦，晚年吉祥。\n8 始 金：刑偶伤子，秀气巧妙，中年多灾，晚年吉祥。\n8 事 金：多愁多忧，事劳无功，一生清雅多灾，晚年吉祥。\n8 受 金：忧心劳神，病弱短寿，中年劳，晚年吉祥。\n8 叔 金：多才巧智，清雅伶俐，出外吉祥，中年劳，晚年吉庆。\n8 刷 金：性刚果断，晚婚吉祥，中年多灾，晚年享福。\n8 祀 金：一生清雅多才，克己助人，温和伶俐，中年多劳，晚年吉庆。\n8 所 金：多愁多忧，多刑克，中年多灾，忌车怕水，晚年吉祥。\n8 昔 金：刑偶伤子，晚婚迟得子大吉，清雅秀气，温和贤淑，幸福之字。\n8 些 金：二子吉祥，多才巧智，清雅伶俐，中年劳，晚年吉祥。\n8 周 金：聪明伶俐，多才多能，中年成功，晚年劳神。\n8 宙 金：多才巧智，秀气伶俐，肯做肯劳，重信义，成功隆昌。\n8 宗 金：英俊聪颖，清雅多才，福禄双收，成功隆昌，环境良好。\n8 卒 金：不祥之字，暗淡无光，恶死凶亡，病弱短寿。\n8 板 木：幼年多灾，少年艰难，中年成功隆昌，环境良好，二子吉祥。\n8 昂 木：子孙兴旺，清雅荣贵，中年成功隆昌，出国之格。\n8 杯 木：清雅秀气，温和贤淑，一生清闲，中年隆昌，晚年吉祥。\n8 杵 木：忧心劳神，事劳无功，中年多劳，晚年吉祥。\n8 东 木：多才巧智，义利分明，中年成功隆昌，刑偶，晚婚吉祥。\n8 林 木：一生平凡，清雅多才，肯做肯劳，重信用，中年劳，晚年吉祥。\n8 杷 木：清雅秀气，多才贤能，中年劳，晚年隆昌，环境良好。\n8 斧 木：生在福家败亡，劳苦或奔波，中年潦倒，晚年吉祥。\n8 供 木：刑偶欠子，多才伶俐，中年成功隆昌，晚年多劳，二子吉祥。\n8 姑 木：温和慈祥，外祥内忧，中年多灾，晚年吉祥。\n8 孤 木：不祥之字，暗淡无光，孤苦一生，难望幸福，多灾厄。\n8 固 木：环境良好，福禄双收，名利有份，中年吉祥，晚年劳神。\n8 乖 木：多刑克，多才多艺，聪明伶俐，中年吉祥，晚年劳神。\n8 官 木：智勇双全，刑偶伤子，一生清雅平凡，中年劳，晚年吉祥。\n8 果 木：二子吉祥，清雅荣贵，中年多灾，晚年如意发达。\n8 杭 木：温和多才，清雅伶俐，中年有灾，忌车怕水，晚年吉祥。\n8 忽 木：忧心劳神，刑偶伤子，中年多灾，晚年吉祥。\n8 昏 木：晚婚迟得子大吉，温和伶俐，秀雅多才，中年平，晚年隆昌。\n8 佶 木：福禄双收，温和伶俐，中年成功隆昌，环境良好，刑偶欠子。\n8 技 木：忧心劳神，少年艰难，中年吉祥，但常有灾厄，晚年吉庆。\n8 季 木：秀气伶俐，温和贤淑，一生清闲，中年成功隆昌。\n8 佳 木：勤俭建业，家声克振，温和多才，中年成功隆昌，晚年劳神，欠子之字。\n8 肩 木：刑偶伤子，忧心劳神，中年劳或病弱，晚年吉祥。\n8 京 木：秀气多才，清雅荣贵，中年成功隆昌，二子吉祥。\n8 纠 木：有爱情烦恼，忧心劳神，身弱短寿，晚年吉祥。\n8 玖 木：理智充足，一生清雅荣贵，中年出外吉，成功隆昌。\n8 居 木：多刑克，刑偶伤子，少年艰难，中年吉祥隆昌，欠子之字。\n8 卷 木：奔波劳苦，忧心劳神，二子吉祥，中年多灾，晚年吉祥。\n8 抗 木：忧心劳神，事劳无功，中年多灾，晚年吉昌。\n8 肯 木：刑偶伤子，事劳无功，忧心劳神，晚年吉祥。\n8 空 木：身弱多病，潦倒一生，中年多灾，晚年吉祥。\n8 快 木：天生聪明，多才有能，中年劳，晚年吉昌，有爱情厄。\n8 狂 木：自我心过强，欠仁和，不详多灾，病弱短寿。\n8 枚 木：奔波劳苦，有才能理智，重情失败，晚年吉昌。\n8 杻 木：忧心劳神，刑偶伤子，怀才不遇，潦倒一生，晚年享福。\n8 其 木：天生聪颖，多才有能，二子吉祥，中年成功隆昌。\n8 奇 木：多才贤能，清雅荣贵，中年劳，晚年成功隆昌，女人有爱情烦恼。\n8 歧 木：多愁善感，忧心劳神，中年多灾，难得幸福。\n8 穹 木：怀才不遇，潦倒一生，性刚口快，中年多灾，晚年吉昌。\n8 屈 木：一生清雅，义利分明，中年劳，晚年吉庆。\n8 券 木：多刑克，幼年多灾，中年多劳，晚年吉祥，但多疾病，\n8 松 木：精明公正，智勇双全，一生清雅荣贵，成功隆昌，出国之字。\n8 枉 木：出外逢贵得财，中年隆昌，子孙兴旺，晚年劳神。\n8 卧 木：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n8 析 木：口快心直，性刚果断，中年多灾，晚年吉祥，幸福之字。\n8 欣 木：清雅伶俐，多才巧智，中年奔波，但成功隆昌。\n8 宜 木：温和贤淑，慈祥有德，中年成功隆昌，清雅荣贵，环境良好。\n8 枝 木：刑偶伤子，多才清雅，中年吉祥，但有意外之灾，晚年隆昌。\n8 竺 木：多才多能，精明公正，中年劳苦，晚年吉祥，二子之字。\n8 杼 木：刑偶伤子，清雅多才，中年有灾，晚年吉祥。\n8 版 水：一生奔波劳苦，身弱短寿，有不幸之灾，或有牢狱之灾。\n8 岸 水：上下敦睦，快乐待人，有才能理智，中年成功隆昌。\n8 八 水：多才巧智，清雅荣贵，成功隆昌，首领之格，老运倍加隆昌。\n8 彼 水：晚婚吉祥，出外大吉，中年劳苦，晚年吉祥。\n8 表 水：出外吉祥，温和诚实，中年劳，晚年吉庆，刑偶或欠子。\n8 秉 水：义利分明，名利双收，清雅荣贵，操守廉正，出国之字。\n8 帛 水：有爱情厄，刑偶伤子，中年多灾，晚年吉昌。\n8 幸 水：秀气伶俐，多才贤能，一生清闲，中年平，晚年幸福吉祥。\n8 房 水：福禄双收，多才多能，中年劳苦，晚年吉祥。\n8 放 水：奔波劳苦，病弱短寿，有爱情厄，中年劳，晚年吉祥。\n8 非 水：清雅秀丽，多才多能，义利分明，中年平凡，晚年吉昌。\n8 汾 水：带刀字，多刑克，晚婚吉，中年劳，晚年吉祥。\n8 奉 水：刑克父母，刑偶伤子，中年劳或疾病，晚年成功隆昌。\n8 扶 水：幼年辛苦，身瘦多才，中年奔波，晚年成功隆昌，女人克夫。\n8 府 水：温和贤淑，清雅多才，中年成功隆昌，环境良好。\n8 阜 水：口快性刚，事劳无功，中年多灾，晚年吉祥。\n8 冈 水：忧心劳神，命运多舛，少年艰难，中年隆昌，晚年忧心劳神。\n8 卦 水：英敏之才，清雅平凡，福禄有份，中年平凡，晚年吉昌。\n8 和 水：上下敦睦，妻贵子贵，中年劳或疾病，晚年隆昌。\n8 呼 水：口快心直，忌车怕水，福禄双收，中年吉祥，晚年劳神。\n8 虎 水：性刚果断，身弱多病，中年多灾，晚年吉祥。\n8 或 水：刑偶伤子，奔波劳苦，中年多灾，福禄有份，晚年吉祥。\n8 盲 水：不祥之字，忌车怕水，一贫如洗，难得幸福。\n8 没 水：不祥之字，勤俭，肯做肯劳，幸福一生，但多灾厄。\n8 妹 水：有爱情烦恼，一生多才，重信义，但多灾，晚年吉祥。\n8 门 水：沉浮不定，一生多劳或困苦，中年多灾，晚年吉庆。\n8 氓 水：多灾厄，病弱短寿，潦倒一生，困苦劳神，有牢狱之灾。\n8 孟 水：刑克父母，慈祥有德，清雅伶俐，中年多灾，晚年吉昌。\n8 宓 水：勤俭肯劳，家声克振，中年成功，欠子之字。\n8 明 水：多才巧智，清雅伶俐，中年多灾，有爱情厄，晚年吉庆。\n8 命 水：多刑克，多能贤淑，苦中得甘，刑偶伤子，晚福之字。\n8 侔 水：性刚口快，有牢狱之灾，中年多灾，晚年吉祥。\n8 沐 水：义利分明，清雅伶俐，双妻之格，中年劳，晚年吉庆。\n8 牧 水：刑偶伤子，奔波劳苦，中年多劳，晚年吉祥。\n8 抛 水：生在福家败散，幼年辛苦，中年奔波，晚年吉祥。\n8 沛 水：性刚口快，清雅英俊，中年成功隆昌，英雄好汉之字。\n8 佩 水：智勇双全，名利双收，清雅荣贵，女人有爱情厄。\n8 朋 水：刑偶伤子，晚婚吉祥，智勇双全，中年劳，晚年隆昌。\n8 汽 水：口快心直，有再嫁之厄，中年劳，重情失败，晚福之字。\n8 沁 水：温和贤淑，有成人之美德，中年劳，晚年劳神。\n8 沙 水：清秀伶俐，多才温和，中年成功隆昌，清闲幸福。\n8 沈 水：清雅伶俐，多才巧智，中年奔波，晚年隆昌。\n8 味 水：福禄双收，清雅多才，出外吉庆，贵人明现，晚年享福。\n8 汶 水：天生聪颖，精明公正，秀气多才，出国之格，中年成功隆昌。\n8 沃 水：幼年辛苦，多刑克，清雅伶俐，秀气巧妙，刑偶伤子。\n8 武 水：吉凶分明，吉则成功隆昌，凶则病弱短寿，刑偶伤子，多灾难。\n8 物 水：克母命，有爱情厄，肯做肯劳，中年平凡，晚年吉祥。\n8 弦 水：多才巧智，性刚口快，中年劳，晚年吉庆。\n8 享 水：晚婚吉祥，出外吉，清雅伶俐，中年劳，晚年隆昌。\n8 协 水：刑偶伤子，清雅伶俐，中年劳，晚年吉祥隆昌。\n8 沂 水：环境良好，温和伶俐，福禄双收，中年成功隆昌。\n8 雨 水：克父命，多才伶俐，幼年辛苦，中年成功隆昌，福寿兴家。\n8 沅 水：出国之字，多才多能，秀雅英敏，中年成功隆昌。\n8 沚 水：清雅伶俐，多才巧智，中年劳或奔波，晚年吉庆。\n8 状 水：忧心劳神，怀才不遇，中年多灾，晚年吉祥。\n8 长 火：过房之字，口快心直，中年劳或多灾，晚年吉祥。\n8 侈 火：温和伶俐，多才巧智，中年劳神或奔波，晚年吉祥。\n8 炊 火：刑偶伤子，忧心劳神，一生难幸福，中年多灾，欠子之字。\n8 徂 火：环境良好，上下敦睦，多才多能，中年忌车怕水，晚年吉祥。\n8 岱 火：智勇双全，武官大吉，福禄双收，温和有德，成功荣贵。\n8 到 火：清雅平凡，忌车怕水，中年多灾，晚年隆昌，二子吉祥。\n8 的 火：勤俭建业，家声克振，中年成功隆昌，女人劳神。\n8 底 火：多愁伶俐，肯做肯劳，中年疾病，晚年吉祥。\n8 典 火：智勇双全，胆识丰足，中年成功隆昌，二子吉祥，出国之字。\n8 店 火：名利双收，福禄有份，事业隆昌，清雅荣贵，刑偶伤子。\n8 定 火：刑偶伤子，多才朴素，温和慈祥，中年成功隆昌，晚年劳神。\n8 侗 火：刑偶伤子，一生清雅荣贵，中年劳或奔波，晚年吉昌。\n8 戽 火：一生多才多艺，中年奔波，晚年隆昌，荣幸之字。\n8 姐 火：温和贤淑，勤俭持家，福禄双收，名利有份，成功隆昌。\n8 咎 火：奔波劳苦，口才伶俐，福禄有份，中年劳，晚年吉祥。\n8 昆 火：英俊才人，清雅多才，中年成功隆昌，名利双收，荣贵之字。\n8 来 火：晚婚迟得子大吉，出外吉祥，中年多劳，有牢狱之灾，晚年隆昌，不幸之字。\n8 肋 火：刑克父母，刑偶伤子，晚婚大吉，中年困苦，晚年享福。\n8 例 火：性刚口快，多愁善感，中年多劳或潦倒，晚年吉祥。\n8 两 火：夫妻和合，福寿兴家，中年吉祥，晚年隆昌，一生幸福。\n8 冽 火：口快性刚，清雅多才，中年劳，晚年吉昌，欠子之字。\n8 侣 火：福禄双收，名利有份，中年平凡，晚年吉祥，二子兴旺。\n8 仑 火：克夫之字，清雅多才，中年有离乱之苦，晚年吉祥。\n8 旻 火：天生聪明，多才多能，中年成功隆昌，一生享福。\n8 奈 火：多才秀气，清雅荣贵，中年成功隆昌，二子吉祥。\n8 妮 火：清雅伶俐，多才秀气，中年成功隆昌，环境良好，出国之字。\n8 念 火：出外大吉，贵人明现，中年成功隆昌，晚年忧心劳神。\n8 弩 火：忧心劳神，病弱短寿，一生多灾，难得幸福。\n8 妾 火：刑偶欠子，有爱情厄，中年吉祥，晚年劳神。\n8 乳 火：清雅伶俐，秀气巧妙，晚婚吉，中年隆昌，晚年劳神。\n8 侍 火：多相克，一生多才，中年有灾，晚年隆昌，欠子之字。\n8 佻 火：有爱情烦恼，清雅秀气，中年有厄，晚年吉祥，荣幸之字。\n8 帖 火：福禄有份，缘和四海，中年吉祥，晚年劳神。\n8 投 火：出外逢贵，但常有祸端，沉浮多厄，内心多忧，晚年吉祥。\n8 罔 火：幼年辛苦，少年艰难，中年吉祥，晚年劳神，暗淡之字。\n8 炎 火：口快心直，英雄豪爽，中年有牢狱之灾，常人难受之字。\n8 易 火：子孙兴旺，多才巧智，勤俭持家，白手成家，成功隆昌。\n8 折 火：孤寡或孤独，多愁善感，中年多劳，晚年吉昌。\n8 争 火：清雅多才，理智充足，一生清闲，中年成功隆昌。\n8 知 火：理智充足，多才巧智，中年成功隆昌，财官兴旺，清雅荣贵。\n8 直 火：一生向上，智勇双全，多才伶俐，成功隆昌，环境良好。\n8 制 火：清雅伶俐，中年虽劳，苦中得甘，晚年吉祥。\n8 忠 火：性刚，英雄豪杰，少年艰难，中年劳，晚年吉祥隆昌，忌车怕水。\n8 卓 火：刑偶伤子，忧心劳神，中年多灾，晚年吉祥。\n8 附 土：智勇双全，清雅聪明，中年成功隆昌，晚年子孙兴旺。\n8 坤 土：清雅伶俐，刑偶伤子，多才多能，中年有灾，晚年吉庆。\n8 坪 土：理智充足，文雅秀气，中年有灾，身闲心劳，晚年隆昌。\n8 坡 土：晚婚吉祥，多愁苦劳，病弱短寿，难得幸福，破相之字。\n8 坦 土：英敏多才，学问丰富，清雅荣贵，成功隆昌。\n8 宛 土：秀气巧妙，多才伶俐，温和贤能，出外吉祥，一生英敏幸福。\n8 往 土：一生清雅多才，勤俭励业，中年劳，但隆昌，晚年吉昌。\n8 旺 土：性刚口快，刑偶欠子，中年奔波，成功隆昌，环境良好。\n8 委 土：忧心劳神，病弱短寿，中年多灾，晚年吉祥，享福之字。\n8 亚 土：智勇双全，多才有能，中年成功隆昌，女人少年艰难或有不幸之灾。\n8 奄 土：忧心劳神，事劳无功，口快心直，中年多灾，晚年隆昌。\n8 肴 土：身弱多病，口快性刚，中年劳，晚年吉祥。\n8 夜 土：忧心劳神，事劳无功，中年吉祥，晚年多苦，子孙吉庆。\n8 依 土：外观幸福，内心多忧，刑偶伤子，中年多灾，晚年吉祥。\n8 抑 土：忧心劳神，事劳无功，中年不幸，晚年吉祥。\n8 侑 土：口快心直，出外吉祥，中年多灾，晚年隆昌，豪杰之字。\n8 昀 土：天生聪颖，学识渊博，清雅荣贵，成功隆昌，名利双收。\n9 查 金：刑偶欠子，多才巧智，清雅伶俐，中年劳，晚年吉祥。\n9 姹 金：温和贤淑，清雅伶俐，中年吉祥，晚年隆昌。\n9 差 金：清雅平凡，技术隆昌，中年劳或奔波，晚年隆昌。\n9 拆 金：有才能理智，但无运，怀才不遇，一生劳苦，晚年享福。\n9 春 金：清雅伶俐，少乐多忧，出外大吉，中年有灾难，欠子之字。\n9 促 金：刑偶伤子，有爱情厄，中年吉祥，晚年劳神。\n9 度 金：出外吉祥，中年奔波劳苦，晚年成功隆昌。\n9 性 金：幼年多灾，中年成功隆昌，环境良好，温和贤淑，晚运劳神。\n9 宫 金：智勇双全，福禄双收，义利分明，晚年隆昌，劳神。\n9 枯 金：温和贤淑，清雅伶俐，有成人之美德，中年平凡，晚年吉祥。\n9 前 金：出外逢贵成功，中年多灾潦倒，晚年吉祥隆昌。\n9 侵 金：忧心劳神，奔波劳苦，中年多灾，晚年吉祥。\n9 秋 金：多才巧智，清雅荣贵，中年成功隆昌，女人虚荣，有爱情厄，晚年吉祥。\n9 柔 金：出外吉祥，福禄双收，中年成功隆昌，晚年倍加隆昌。\n9 砂 金：命硬多刑克，晚婚吉祥，中年劳，晚年吉祥。\n9 衫 金：二子吉祥，一生清雅平凡，中年吉祥，晚年劳神。\n9 甚 金：口快心直，欠子或多子，中年吉祥隆昌，晚年劳神。\n9 牲 金：性刚果断，口快心直，中年劳，晚年吉祥。\n9 省 金：刑偶伤子，性刚多灾，中年劳苦，晚年吉祥，女人薄幸。\n9 施 金：一生多福少劳，福禄丰厚，中年吉祥，晚年劳神。\n9 食 金：奔波劳苦，口快性刚，中年多灾，晚年吉祥。\n9 室 金：一生向上，贵人明现，多才多福，中年成功隆昌。\n9 是 金：清雅秀气，多才温和，中年吉祥，晚年多疾。\n9 首 金：忧心劳神，事劳无功，二子吉祥，中年多灾，晚年吉祥。\n9 帅 金：刑克父母，性刚果断，中年成功隆昌，晚年劳神。\n9 思 金：有才能理智，勤俭励业，家声克振，名利双收，晚年劳神。\n9 俗 金：温和伶俐，福禄双收，清雅欠子，中年劳，晚年吉祥。\n9 削 金：刑偶伤子，百事劳苦，一贫如洗，潦倒一生，劳苦之字。\n9 信 金：多才能干，清雅英敏，配合吉则成功隆昌，配合凶则有牢狱之灾。\n9 星 金：有才干理智，清雅贤淑，有美德雅量，中年劳，晚年隆昌。\n9 叙 金：精明公正，雅量多才，出外吉庆，成功隆昌，荣贵之字。\n9 宣 金：学识渊博，胆智双收，清雅荣贵，中年成功隆昌，官旺之字。\n9 页 金：二子吉祥，义利分明，中年成功隆昌，清雅荣贵。\n9 俞 金：一生清闲，理智充足，中年吉祥，晚年隆昌。\n9 哉 金：学识渊博，操守廉正，中年成功隆昌，出国之字。\n9 则 金：精明公正，克己助人，中年成功隆昌，一生荣贵享福。\n9 峙 金：一生清闲，刑偶伤子，中年多灾，晚年吉祥。\n9 拙 金：多愁多忧，事劳无功，中年劳苦，晚年吉祥。\n9 咨 金：福禄双收，清雅荣贵，中年成功隆昌，晚年倍加隆昌。\n9 姿 金：秀气巧妙，贤能晓事，温和伶俐，成功隆昌。\n9 昨 金：一生劳苦，孤独性格，中年多灾，晚年荣禄。\n9 柄 木：多才巧智，环境良好，清雅荣贵，中年成功隆昌。\n9 柴 木：一生清雅平凡，福禄双收，名利有份，中年劳，晚年隆昌。\n9 俄 木：自尊心强，意气大，出外吉祥，中年多灾，晚年吉祥。\n9 肝 木：刑偶伤子，事劳无功，中年隆昌，晚年吉昌，欠子之字。\n9 柑 木：有爱情烦恼，身弱多病，中年吉祥，晚年劳神，克偶伤子。\n9 竿 木：性刚果断，有牢狱之灾，中年多灾，晚年吉祥。\n9 革 木：性刚口快，多才清雅，中年吉昌，晚年劳神。\n9 故 木：出外吉祥，刑偶伤子，中年劳或有灾，晚年吉祥，清雅多才。\n9 冠 木：一生清雅秀气，幼年辛苦，中年开泰吉祥，出外隆昌。\n9 轨 木：教育界大吉，温和贤淑，有美德雅量，中年劳，晚年隆昌。\n9 癸 木：刑偶伤子，多才清雅，中年劳，晚年成功隆昌。\n9 哄 木：福禄双收，二子吉祥，中年虽劳，成功隆昌，短寿之字。\n9 虹 木：晚婚大吉，清雅多才，中年成功隆昌，出国之格。\n9 急 木：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n9 纪 木：智勇双全，义利分明，克己助人，中年奔波，晚年吉祥。\n9 既 木：出外逢贵得财，多才有能，中年劳，晚年吉祥。\n9 架 木：刑克父母，身弱短寿，有才能理智，晚年吉祥。\n9 建 木：出外吉祥，兄弟不和，中年成功隆昌，环境良好。\n9 姜 木：多才巧智，清雅温和，中年劳，晚年吉祥。\n9 姣 木：秀气多才，清雅温和，有爱情厄，中年成功隆昌。\n9 皆 木：晚婚迟得子大吉，出外吉祥，中年劳苦，晚年吉庆。\n9 界 木：克父命，兄弟无靠，英敏伶俐，温和贤淑，二子吉祥。\n9 劲 木：刑克父母，刑偶伤子，中年多灾，晚年隆昌。\n9 九 木：福寿双全，贵人明现，出外大吉，环境良好，出国之格。\n9 拘 木：暗淡无光，虽成功难幸福，病弱短寿，多灾厄。\n9 拒 木：智勇双全，福禄双收，性刚豪爽，中年劳，晚年隆昌。\n9 军 木：义利分明，智勇双全，中年劳，成功隆昌。\n9 看 木：清雅伶俐，清秀多才，中年吉祥，晚年劳神多疾。\n9 柯 木：清雅伶俐，智勇双全，福禄有份，中年平凡，晚年吉昌。\n9 科 木：多才俊美，清雅荣贵，中年成功隆昌，出外吉祥幸福。\n9 客 木：福禄双收，清雅伶俐，中年多劳，晚年吉祥，短寿之字。\n9 柳 木：温和贤淑，秀气多才，多情恩重，中年成功，自成家业。\n9 芒 木：一贫如洗，病弱短寿，中年多灾，晚年吉祥。\n9 祈 木：口快性刚，克父命，多才巧智，中年潦倒，晚年吉祥，环境良好。\n9 契 木：带刀厄，刑偶伤子，病弱短寿，中年多灾，晚年吉祥。\n9 柿 木：忌车怕水，清秀多才，中年有灾，晚年吉祥。\n9 玩 木：出外吉祥，幼年辛苦，中年成功隆昌，晚年忧心劳神。\n9 侠 木：口快心直，英雄豪杰，中年多灾，事劳无功，晚年吉祥。\n9 相 木：有才能理智，刑偶伤子，双妻之格，中年成功隆昌。\n9 彦 木：操守廉正，名利双收，官运旺，成功隆昌。\n9 羿 木：操守廉正，勤俭忠诚，中年吉祥，忌车怕水，女人有爱情厄。\n9 胤 木：清雅荣贵，福寿绵长，学识丰富，成功隆昌。\n9 柚 木：福禄双收，名利有份，中年奔波，晚年劳神。\n9 禺 木：多刑克，刑偶伤子，清雅平凡，中年多劳，晚年吉祥。\n9 柘 木：刑克父母，多才多能，怀才不遇，中年多劳，晚年成功隆昌。\n9 芝 木：英雄豪爽，多才巧智，缘和四海，出外成功，清雅荣幸。\n9 斫 木：多刑克，损丁破财，病弱短寿，困苦一生，终生不幸。\n9 拜 水：天生聪明，多才伶俐，晚婚吉祥，重情失败，晚年吉祥。\n9 保 水：天生聪颖，理智充足，中年成功隆昌，晚年忌车怕水。\n9 抱 水：一生平凡，身弱短寿，有牢狱之灾，晚年享福。\n9 背 水：刑偶伤子，忧心劳神，身弱多病，晚年吉祥。\n9 甭 水：多才巧智，秀气巧妙，清雅荣贵，中年成功隆昌。\n9 毖 水：口快心直，忧心劳神，中年有灾，晚年享福。\n9 扁 水：一生聪明伶俐，口快心直，中年平，晚年吉祥，女人多灾，病弱寿短。\n9 便 水：福禄双收，出外吉祥，中年劳，成功隆昌，晚年吉祥，但欠子。\n9 波 水：白手成家，出外大吉，中年劳或潦倒，晚年成功隆昌，荣贵之字。\n9 泊 水：智勇双全，清雅荣贵，福寿兴家，中年成功隆昌。\n9 勃 水：怀才不遇，有才能，无统帅之才干，中年劳，晚年吉祥。\n9 法 水：刑偶欠子，一生清雅多财，中年成功隆昌，晚年吉庆。\n9 勉 水：多愁多忧，刑偶伤子，有爱情烦恼，中年多灾，难得幸福。\n9 眇 水：有爱情烦恼，身弱多病，中年劳，晚年吉祥。\n9 秒 水：刑克父母，刑偶伤子，贵人明现，中年劳，晚年吉祥。\n9 拍 水：技术吉祥，肯做肯劳，重信用，中年多劳，晚年隆昌。\n9 飞 水：英雄豪杰，义利分明，智勇双全，但常人难受之字，忌车怕水。\n9 风 水：身弱多病，奔波劳苦，中年吉祥，晚年劳神。\n9 封 水：外观幸福，内心多忧，清雅平凡，一生多忧少乐，晚年吉祥。\n9 负 水：带刀厄，清雅多才，二子吉祥，晚年安详。\n9 泔 水：良善积德，克己助人，中年成功隆昌，环境良好，子孙兴旺。\n9 河 水：英雄或英敏，多才多能，二子吉祥，中年劳，晚年隆昌，忌车怕水。\n9 红 水：克父命，多才巧智，清雅荣贵，中年劳，晚年吉祥。\n9 泓 水：义利分明，福禄双收，中年虽劳，成功隆昌，官旺之字。\n9 侯 水：清雅多才，理智充足，中年平凡，晚年吉祥。\n9 后 水：衣食丰厚，一表人才，多才多能，清雅荣贵，中年成功隆昌。\n9 厚 水：温和贤淑，一生清雅荣贵，中年成功隆昌，安富尊荣。\n9 皇 水：英敏之才，特有人缘，中年劳或奔波，晚年吉祥。\n9 计 水：口才伶俐，多才贤能，中年吉祥，刑偶伤子，晚年劳神。\n9 炬 水：多才有能，官运旺盛，刑偶伤子，一生清雅荣贵。\n9 玫 水：多才巧智，天生聪明，中年成功隆昌，清雅荣贵，出国之字。\n9 眉 水：温和贤淑，清雅秀气，小心爱情厄，中年成功隆昌。\n9 美 水：清雅秀气，多才贤能，中年吉祥，晚年隆昌，清秀之字。\n9 昧 水：暗淡无光，命途多舛，中年多灾，晚年吉祥。\n9 泯 水：多才巧智，天生聪明，一生操守廉正，官格成功隆昌之字。\n9 某 水：多才巧智，清雅荣贵，中年成功隆昌，二子吉祥，女人不幸。\n9 盼 水：清雅伶俐，带刀字，刑偶伤子，中年吉祥，晚年隆昌，环境良好。\n9 品 水：性刚，秀气多才，温和伶俐，福禄双收，中年隆昌荣华。\n9 屏 水：多才清雅，荣贵安福，成功隆昌，出国之字，小心爱情厄。\n9 泉 水：英俊佳人，温和多才，清雅荣贵，中年成功隆昌，晚年劳神。\n9 染 水：一生清雅平凡，多才巧智，中年成功隆昌，晚年劳神。\n9 泗 水：环境良好，清雅荣贵，福禄双收，中年劳，晚年吉庆。\n9 咸 水：克父命，清雅伶俐，中年吉祥，晚年劳神，身闲心苦。\n9 香 水：身弱多灾，忧心劳神，中年劳，晚年吉祥。\n9 巷 水：忧心劳神，一生劳苦多忧，晚婚吉，中年劳，晚年吉祥。\n9 妍 水：多才巧智，清雅伶俐，刑偶伤子，中年多灾，晚年吉祥，忌车怕水。\n9 沿 水：福禄双收，名利有份，口快心直，贵人明现，晚年隆昌。\n9 衍 水：一生清雅，多才巧智，中年劳，晚年隆昌，名利双收。\n9 泱 水：秀气巧妙，清雅伶俐，中年吉庆，晚年子孙鼎盛。\n9 盈 水：带血字，多刑克，薄幸多灾，有爱情厄，晚年吉祥。\n9 泳 水：克父伤子，幼年辛苦，早出社会，中年成功隆昌，荣幸之字。\n9 油 水：刑偶伤子，双妻之格，出外吉祥，中年劳，晚年吉昌。\n9 沾 水：清雅多才，秀气贤淑，中年吉祥，晚年隆昌，荣贵幸福。\n9 沼 水：智勇双全，学识丰富，官格之字，中年成功隆昌，带刀厄，刑偶欠子。\n9 治 水：清雅荣贵，多才多能，中年成功隆昌，女人薄幸多灾，再嫁之字。\n9 注 水：多能温和，重信用，中年多灾，晚年吉祥。\n9 炳 火：兄弟无缘，清雅荣贵，中年成功隆昌，环境良好，医界大吉。\n9 抽 火：出外逢贵得财，中年吉祥，晚年子孙兴旺，双妻之格。\n9 待 火：秀气伶俐，多才秀气，中年劳神，晚年吉祥。\n9 怠 火：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n9 抵 火：常生祸端，多灾厄，刑偶伤子，中年劳苦，晚年享福。\n9 帝 火：英敏多才，福禄双收，英俊佳人，中年吉庆，富贵隆昌。\n9 订 火：清雅英俊，多才伶俐，万事如意，刑偶伤子，晚年吉昌。\n9 段 火：奔波劳苦，性刚果断，中年潦倒，晚年吉祥。\n9 盾 火：技术大吉，多劳少乐，中年劳苦，晚年隆昌。\n9 赴 火：保守之格，一生清雅平凡，中年劳，晚年吉祥，子孙兴旺。\n9 拐 火：少年艰难，忌车怕水，父母无缘，中年劳，晚年隆昌。\n9 柬 火：忧心劳神，刑偶伤子，中年吉祥，晚年劳神，多疾病。\n9 玦 火：刑偶伤子，一生清雅伶俐，小心爱情厄，晚年吉祥。\n9 俊 火：英敏之才，上下敦睦，中年成功隆昌，出外吉祥，名利双收。\n9 亮 火：义利分明，多才能干，小心爱情厄，成功隆昌，女人薄幸，难得幸福。\n9 律 火：秀气伶俐，理智充足，中年有爱情厄，但吉祥，晚年隆昌。\n9 娜 火：婀娜多姿，秀气伶俐，晚年吉祥，小心爱情厄，晚年吉祥。\n9 耐 火：忧心劳神，事劳无功，清雅多才，中年劳，晚年吉祥。\n9 南 火：忧心劳神，孤独大吉，中年多劳或潦倒，晚年吉祥隆昌。\n9 怒 火：身闲心苦，病弱短寿，中年多灾，晚年吉祥。\n9 炮 火：刑克父母，刑偶伤子，中年多灾，晚年吉祥。\n9 泰 火：多才巧智，清雅荣贵，中年成功隆昌，晚年倍加隆昌。\n9 炭 火：多才巧智，性刚口快，晚年吉祥，中年劳，晚年吉昌。\n9 亭 火：多才巧智，清雅伶俐，小心爱情厄，中年吉祥，晚年隆昌。\n9 突 火：自尊心强，欠仁和，怀才不遇，中年劳，晚年吉祥。\n9 歪 火：忧心劳神，常有病端，中年多灾，一生难得幸福。\n9 炫 火：多福多才，清雅荣贵，官缘得禄，成功隆昌，出国之格。\n9 映 火：智勇双全，名利双收，中年成功隆昌，一生安详伶俐。\n9 昱 火：清雅荣贵，温和贤能，中年成功隆昌，出国之格。\n9 怨 火：克父命，一生清雅伶俐，中年吉祥，有爱情厄，晚年安稳。\n9 灾 火：孤寡薄幸，身弱短寿，中年多灾，晚年吉祥。\n9 招 火：晚婚大吉，忌车怕水，多灾劳神，中年多厄，晚年吉祥，带刀厄。\n9 昭 火：刑偶欠子，清雅多才，智勇双全，官运旺，晚年吉昌，多才荣贵。\n9 贞 火：秀气伶俐，温和贤淑，中年成功隆昌，二子吉祥，荣贵之字。\n9 政 火：英敏多才，出外吉祥，中年成功隆昌，晚年劳神。\n9 祉 火：一生清雅灵敏，多才雅量，中年平，晚年隆昌。\n9 重 火：清雅荣贵，家声克振，安享尊荣，成功隆昌，富贵双全。\n9 纣 火：刑偶伤子，有爱情厄，中年多灾，晚年隆昌，但劳神。\n9 奏 火：有爱情厄，多才巧智，清雅伶俐，中年成功隆昌。\n9 哀 土：暗淡无光，病弱短寿，恶死凶亡，命运多舛，难得幸福。\n9 衩 土：多愁多忧，刑偶伤子，中年多灾，出外吉祥，晚年隆昌。\n9 昶 土：子孙兴旺，多才巧智，中年成功隆昌，晚年劳神。\n9 型 土：忧心劳神，少乐多忧，中年多灾，晚年吉祥。\n9 奎 土：一生福禄有进，智勇双全，中年吉祥，晚年隆昌。\n9 盆 土：带血字，多灾厄，多忧少乐，身弱短寿，薄幸之字。\n9 威 土：口快性刚，智勇双全，中年劳或奔波，晚年成功隆昌。\n9 畏 土：忧心劳神，事劳无功，一生多灾，晚年吉祥。\n9 胃 土：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n9 屋 土：多愁多忧，晚婚迟见子，中年吉祥，晚年劳神。\n9 押 土：忧心劳神，病弱短寿，有牢狱之灾，一生难得幸福。\n9 要 土：性刚口快，清雅伶俐，中年吉祥，晚年劳神。\n9 怡 土：刑偶伤子，清雅秀气，温和贤淑，中年有灾，晚年吉祥。\n9 姻 土：有爱情厄，清雅伶俐，多才肯劳，中年平，晚年吉祥。\n9 音 土：晚婚迟得子大吉，出外吉祥，中年劳，晚年吉祥，双妻之格。\n9 勇 土：晚婚吉祥，多才贤能，中年多劳，晚年吉祥，忌车怕水。\n9 幽 土：有爱情烦恼，病弱短寿，暗淡无光，常有祸端。\n9 囿 土：官或财旺，一生福禄双收，中年吉祥隆昌，清荣享福。\n9 宥 土：安详享福，慈祥有德，中年吉祥，晚年隆昌。\n9 禹 土：刑克父母，天生聪明，有才无运，有伤子之厄，晚年吉祥。\n9 垣 土：义利分明，朴素温和，中年成功隆昌。\n9 约 土：多才巧智，清雅荣贵，中年成功隆昌，女人有爱情厄，教育界吉。\n10 财 金：忧心劳神，刑偶伤子，事劳无功，忌车怕水，中年吉祥，晚年多灾。\n10 仓 金：福禄双收，清雅伶俐，晚婚吉祥，中年劳，晚年吉祥。\n10 晁 金：天生聪明，智勇双全，中年成功隆昌，出国之字，忌车怕水。\n10 宸 金：一生清雅荣贵，温和贤能，中年成功隆昌，环境良好。\n10 乘 金：刑偶伤子，忧心劳神，肯做肯劳，难得幸福，多灾难。\n10 持 金：刑偶伤子，天生聪明，清雅伶俐，中年劳，晚年吉祥。\n10 纯 金：有爱情烦恼，忧心劳神，二子吉祥，中年成功隆昌。\n10 祠 金：多才巧智，清雅荣贵，智勇双全，中年成功隆昌，幸福之字。\n10 钉 金：多刑克，性刚口快，中年困苦，命途多舛。\n10 刚 金：智勇双全，武官大吉，中年劳，晚年成功隆昌，清雅荣贵，二子吉祥。\n10 罡 金：精明公正，义利分明，重意气，清雅荣贵，官旺，成功隆昌。\n10 怪 金：忧心劳神，病弱短寿，多灾难，刑偶伤子。\n10 借 金：温和贤能，多才伶俐，中年劳，成功隆昌，迟见子吉祥。\n10 峻 金：孤独格，英俊佳人，多才贤能，中年隆昌，出国之格。\n10 倪 金：出外吉祥，多才巧智，清雅伶俐，出国之字，成功隆昌，孤独格。\n10 剖 金：福禄双收，二子吉祥，中年多劳，晚年吉祥。\n10 倩 金：刑偶欠子，身弱多忧，一生清雅，中年吉祥，晚年劳神。\n10 弱 金：不祥之字，暗淡无光，病弱短寿，多灾难，难得幸福。\n10 珊 金：秀气伶俐，多才巧智，中年成功隆昌，出国之字。\n10 闪 金：上下敦睦，温和多才，中年吉祥，环境良好，清雅享福。\n10 讪 金：一生清雅多才，兄弟无缘，中年吉祥，晚年隆昌，环境良好。\n10 射 金：有破相之危，多刑克，命硬，中年多灾，晚年吉祥，但寿短。\n10 娠 金：秀气多才，贤能温和，中年吉祥，晚年隆昌。\n10 神 金：清雅英敏，多才巧智，中年吉祥，晚年隆昌。\n10 十 金：温和贤淑，缘和四海，上下敦睦，成功隆昌。\n10 拾 金：福禄双收，多才贤能，清雅荣贵，成功隆昌，环境良好。\n10 狩 金：刑偶伤子，清雅伶俐，中年奔波，晚年吉祥。\n10 书 金：清雅荣贵，多才巧智，精明公正，义利分明，英俊成功。\n10 殊 金：有爱情厄，忧心劳神，中年有灾，晚年吉祥，不幸之字。\n10 素 金：身弱多病，晚婚吉祥，中年幸福，晚年吉祥，多愁忌水之字。\n10 孙 金：清雅伶俐，多才巧智，中年多灾或奔波，晚年吉祥。\n10 隼 金：秀气巧妙，少年艰难，中年吉祥，先苦后甘，晚年隆昌。\n10 索 金：有爱情烦恼，暗淡无光，中年多舛，晚年享福。\n10 紊 金：英俊伶俐，克己助人，中年成功隆昌，清雅荣贵。\n10 息 金：忧心劳神，刑偶伤子，中年劳或潦倒，晚年吉祥。\n10 席 金：聪明伶俐，清雅多才，中年有灾，晚年吉祥，环境良好。\n10 笑 金：刑偶伤子，少年艰难，中年吉祥，晚年劳神。\n10 修 金：英秀伶俐，温和贤能，上下敦睦，中年成功，晚年隆昌。\n10 徐 金：一生清雅荣贵，多才巧智，中年成功隆昌，晚年劳神。\n10 殉 金：暗淡无光，身弱短寿或欠子，中年吉祥，晚年多灾。\n10 栽 金：多才伶俐，清雅荣贵，中年成功隆昌，晚年劳神。\n10 宰 金：身弱短寿，事劳无功，忌车怕水，中年有灾，晚年吉祥。\n10 钊 金：带刀厄，礼诚待人，安稳守己，中年劳苦，晚年隆昌。\n10 针 金：刑偶伤子，晚婚迟得子大吉，中年多灾，晚年吉祥。\n10 真 金：清雅多才，温和伶俐，中年成功隆昌，荣贵清闲，二子吉祥。\n10 纸 金：忧心劳神，事劳无功，中年劳苦，晚年吉祥。\n10 指 金：晚婚吉祥，忧心劳神，身弱多劳，晚年吉祥。\n10 酌 金：一生清雅伶俐，多才巧智，中年劳，晚年吉祥，福禄之字。\n10 租 金：一生清雅多才，中年吉祥，环境良好，福寿兴家。\n10 祖 金：清雅荣贵，官格之字，中年吉祥隆昌，晚年劳神，忌车怕水。\n10 祚 金：刑偶伤子，肯做肯劳，勤俭持家，中年劳，晚年吉祥。\n10 座 金：清雅温和，多才伶俐，中年多灾或奔波，晚年吉祥。\n10 芳 木：英敏雅气，多才温和，出外吉庆，荣贵隆昌，环境良好。\n10 芬 木：带刀厄，幼年辛苦，少年艰难，中年吉祥，清雅伶俐，短寿之字。\n10 粉 木：带刀厄，有爱情厄，刑偶伤子，中年有灾，晚年吉祥。\n10 芙 木：秀气灵巧，清雅伶俐，中年劳，晚年吉祥，环境良好。\n10 高 木：一生清雅，福禄双收，中年劳，晚年吉祥。\n10 哥 木：福禄双收，口才伶俐，天生聪明，中年劳，晚年吉祥。\n10 格 木：一生多福少劳，清雅伶俐，中年吉祥，晚年劳神。\n10 根 木：英敏之才，特有人缘，上下敦睦，中年劳，晚年吉祥，父母无缘。\n10 耕 木：清雅伶俐，理智充足，中年成功隆昌，环境良好，官运旺。\n10 恭 木：幼年辛苦，身有暗病，中年吉祥，晚年劳神。\n10 躬 木：身弱短寿，一生劳神，难得幸福，抱恨九泉。\n10 贡 木：二子吉祥，多子短寿，中年吉祥，晚年劳神。\n10 骨 木：不祥之字，病弱短寿，困苦一生，多灾难。\n10 挂 木：智勇双全，清雅伶俐，中年成功隆昌，双妻之格，荣贵之字。\n10 鬼 木：不祥之字，多灾难，病弱短寿，一生困苦，难得幸福。\n10 桂 木：清雅伶俐，多才秀气，中年吉祥，成功隆昌，女人不幸。\n10 核 木：奔波劳苦，多愁少乐，中年多灾，晚年吉祥。\n10 笏 木：不祥之字，多灾难，暗淡无光，中年潦倒，晚年享福。\n10 花 木：虚荣心强，有爱情厄，中年吉祥，晚年劳神或疾病。\n10 桓 木：一生安享尊荣，多才廉正，中年成功隆昌，出国享福之字。\n10 恢 木：一生清雅平凡，晚年吉祥。\n10 姬 木：少年艰难，有爱情厄，中年多劳，晚年吉祥隆昌。\n10 屐 木：刑偶伤子，有爱情厄，中年多劳，晚年吉祥，出外大吉。\n10 笈 木：出外逢贵，清雅伶俐，中年多灾，事劳无功，晚年吉祥。\n10 记 木：过房之格，清雅秀气，中年吉祥，晚年忧心劳神。\n10 珈 木：一生多福，福禄双收，中年成功隆昌，环境良好。\n10 家 木：出外吉祥，多才巧智，清雅伶俐，忌车怕水，晚年吉祥。\n10 兼 木：英敏之才，特有人缘，上下敦睦，中年劳，晚年隆昌。\n10 衿 木：温和伶俐，多才巧智，身弱多劳，中年有灾，晚年吉祥。\n10 径 木：有爱情厄，刑偶伤子，身弱多病，中年劳，晚年吉祥。\n10 矩 木：多才巧智，清雅荣贵，中年成功隆昌，名利双收。\n10 俱 木：二子吉祥，多才伶俐，中年劳，晚年吉庆。\n10 娟 木：有爱情厄，事劳无功，中年有灾，晚年吉祥，刑偶伤子。\n10 库 木：安稳守己，温和伶俐，中年有灾，晚年吉祥。\n10 括 木：清雅平凡，福禄双收，晚婚迟得子大吉，中年多灾，晚年吉祥。\n10 栗 木：秀气巧妙，多才清雅，中年劳或奔波，晚年吉祥。\n10 栖 木：多才巧智，清雅荣贵，中年有灾，晚年成功隆昌。\n10 岂 木：英敏之才，多才巧智，清雅荣贵，中年吉祥，出国之字。\n10 起 木：忧心劳神，暗淡无光，中年多灾，晚年吉祥。\n10 气 木：有爱情厄，不幸而离乱，中年多灾，晚年吉祥。\n10 虔 木：忧心劳神，事劳无功，中年多灾，晚年吉祥，不幸之字。\n10 衾 木：温和慈祥，清雅伶俐，中年劳且奔波，晚年吉祥。\n10 拳 木：多灾难，病弱短寿，有牢狱之灾，中年劳苦，晚年享福。\n10 缺 木：多愁多劳，事劳无功，中年多灾，晚年享福。\n10 桑 木：忧心劳神，事劳无功，中年有灾，晚年劳神，忌车怕水。\n10 栓 木：多才巧智，清雅伶俐，中年劳，晚年吉祥。\n10 笋 木：晚婚迟得子大吉，小心爱情厄，中年劳，晚年吉祥。\n10 桃 木：刑偶欠子，有爱情厄，秀气多才，清雅伶俐，中年平，晚年吉祥。\n10 桐 木：刑偶伤子，双妻之格，中年劳，晚年隆昌，荣华之字。\n10 奚 木：福禄双收，清雅荣贵，中年吉祥，晚年隆昌，劳神之字。\n10 校 木：暗路长行，出外吉祥，中年有灾，晚年吉祥。\n10 芯 木：有爱情厄，秀气伶俐，多才温和，晚婚吉，荣贵吉祥。\n10 芽 木：忧心劳神，有爱情厄，清雅秀气，中年吉祥，晚年劳神。\n10 倚 木：福禄双收，中年有灾或有爱情厄，晚年享福。\n10 娱 木：虚荣心强，有不幸之灾，中年多灾，晚年吉祥。\n10 原 木：清雅荣贵，多才巧智，中年吉祥，晚年隆昌。\n10 纭 木：多才巧智，清雅伶俐，中年成功隆昌，出国之格。\n10 芸 木：温和贤淑，多才能干，中年成功隆昌，清雅荣贵，出国之格。\n10 芷 木：温和贤能，多才多能，中年成功隆昌，环境良好。\n10 株 木：病弱短寿，贤能温和，中年有灾，二子吉祥。\n10 班 水：温和贤能，怀才不遇，中年劳，晚年吉祥，欠子之字。\n10 豹 水：口快性刚，多才伶俐，中年劳，晚年吉祥，刑偶伤子，武将吉。\n10 倍 水：天生聪明，福禄双收，名利有份，中年成功隆昌，出国之格。\n10 俵 水：出外逢贵得财，一生清雅平凡，保守之格，晚年吉祥隆昌。\n10 病 水：不祥之字，命途多舛，困苦一生。\n10 秤 水：教育界大吉，一生清雅平凡，名利双收，女人有爱情厄。\n10 臭 水：忧心劳神，刑偶伤子，中年多灾，晚年吉祥。\n10 洞 水：刑偶伤子，中年奔波，多才巧智，晚年成功隆昌。\n10 娥 水：天生聪明，一生清雅伶俐，自尊心强，中年吉祥，晚年劳神。\n10 眠 水：一生清雅，多才巧智，温和贤能，中年劳，晚年吉祥。\n10 派 水：性刚，英雄豪杰，出外逢贵，中年劳，晚年隆昌。\n10 肪 水：清雅秀气，温和贤淑，中年成功隆昌，环境良好。\n10 纺 水：肯做垦劳，重信义，中年吉祥，子孙鼎盛，晚年隆昌。\n10 肥 水：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n10 纷 水：带刀厄，多刑克，刑偶伤子，中年多灾，晚年吉祥。\n10 峰 水：义利分明，清雅荣贵，出外逢贵，成功隆昌，英俊多才。\n10 俸 水：刑克父母，清雅伶俐，中年多灾，晚年隆昌。\n10 服 水：忧心劳神，事劳无功，有才能理智，晚年成功吉昌。\n10 俯 水：清雅伶俐，刑偶欠子，中年吉祥，晚年劳神，环境良好。\n10 釜 水：一生福禄双收，名利有份，中年吉祥，晚年隆昌，环境良好。\n10 害 水：忌车怕水，福禄双收，刑偶欠子，中年劳苦，晚年吉祥。\n10 航 水：温和贤淑，一生清雅平凡，中年劳，晚年隆昌。\n10 耗 水：忧心劳神，清雅伶俐，中年劳，晚年吉祥。\n10 恨 水：忧心劳神，事劳无功，有爱情厄，中年吉祥，晚年劳神。\n10 恒 水：一生多福，清雅荣贵，中年成功隆昌。\n10 洪 水：一生清雅，温和伶俐，中年潦倒，晚年隆昌。\n10 候 水：一生清雅多灾，中年劳苦或潦倒，晚年吉祥。\n10 祜 水：温和伶俐，福禄双收，中年多灾或潦倒，晚年吉祥。\n10 活 水：福禄双收，秀气伶俐，中年成功隆昌，晚年劳神。\n10 津 水：秀气巧妙，理智充足，晚婚吉祥，中年成功隆昌。\n10 酒 水：身弱短寿，多忧少乐，中年多灾，晚年吉祥。\n10 洛 水：天生聪明，多才巧智，中年成功隆昌，子孙兴旺，出国之字。\n10 马 水：清雅多才，中年劳或奔波，晚年吉祥。\n10 秘 水：一生向上，智勇双全，勤俭建业，家声克振，成功隆昌。\n10 亩 水：多才巧智，清雅伶俐，中年吉祥，晚年隆昌，环境良好。\n10 纽 水：有爱情烦恼，身弱短寿，中年劳，晚年吉祥。\n10 畔 水：刑偶伤子，奔波劳苦，中年吉祥，晚年劳神多病。\n10 旁 水：忧心劳神，事劳无功，中年劳苦，晚年吉祥。\n10 配 水：忧心劳神，迟得子，二子吉祥，中年劳，晚年吉祥。\n10 疲 水：身弱短寿，怀才不遇，中年多灾，一生难得幸福。\n10 珀 水：学识丰富，温和贤能，英俊才人，成功隆昌，忌车怕水，女人有爱情厄。\n10 圃 水：精明公正，智勇双全，一生清雅荣贵，成功隆昌。\n10 洽 水：福禄双收，多才伶俐，中年成功隆昌，双妻之格，名利之字。\n10 洒 水：多才巧智，英俊佳人，中年成功隆昌，出国之格，荣贵之字。\n10 杀 水：忧心劳神，多疾病，中年多灾，晚年隆昌。\n10 纱 水：小巧伶俐，清雅秀气，小心爱情厄，晚年吉祥，欠子之字。\n10 娑 水：多相克，事劳无功，中年有灾，晚年难得幸福。\n10 纹 水：刑偶欠子，肯做肯劳，重信用，再嫁之字，晚年隆昌。\n10 蚊 水：清雅伶俐，肯做肯劳，重信义，中年离乱，晚年吉祥，刑偶伤子。\n10 务 水：刑克父母，刑偶伤子，中年多灾，晚年吉祥，短寿之字。\n10 洗 水：出外吉祥，刑偶伤子，清雅多才，中年多灾，晚年隆昌。\n10 效 水：多才巧智，清雅伶俐，中年成功隆昌，晚年吉祥，环境良好。\n10 恤 水：带血字，多刑克，多灾难，恶死凶亡，病弱短寿，难得幸福。\n10 训 水：一生清雅平凡，晚婚大吉，双妻之格，多灾难，怀才不遇。\n10 洋 水：清雅伶俐，多能多才，中年吉祥隆昌，幸福之字。\n10 耘 水：天生聪明，多才巧智，中年吉祥，晚年劳神。\n10 洲 水：克父命，刑偶伤子，中年奔波劳苦，身有暗疾，晚年隆昌。\n10 耻 火：三心两意，内心多忧，欠勇气，晚年吉祥。\n10 玳 火：秀气巧妙，清雅伶俐，出外吉祥，中年劳，晚年隆昌，一生多福。\n10 岛 火：天生聪明，一生清雅多才，中年或奔波劳，晚年吉祥。\n10 娣 火：清雅多才，英敏伶俐，福禄双收，成功隆昌，出国之字。\n10 冻 火：清雅平凡，多才巧智，中年吉祥，晚年隆昌，刑偶伤子。\n10 恕 火：怀才不遇，潦倒一生，清雅多才，无运之格，晚年吉祥。\n10 耿 火：一生清雅，缘和四海，中年劳或潦倒，晚年吉祥。\n10 烘 火：性刚果断，秀气巧妙，多才有能，中年吉祥，晚年劳神。\n10 疾 火：灾祸重重，难得成功，不祥之字，多灾难，恶死凶亡之字。\n10 晋 火：孤独格，晚婚吉祥，中年隆昌，环境良好，晚年劳神。\n10 朗 火：天生聪明，上下敦睦，多才巧智，中年成功隆昌，幸福之字。\n10 娌 火：清雅伶俐，子孙兴旺，中年成功隆昌，荣贵幸福，环境良好。\n10 凉 火：夫妻有刑，晚见子吉，中年劳，晚年吉祥。\n10 料 火：清雅伶俐，有爱情厄，中年劳，晚年隆昌，环境良好。\n10 烈 火：性刚口快，出外大吉，刑偶欠子，中年劳，晚年吉昌，官旺之字。\n10 玲 火：清秀巧妙，多才有能，中年成功隆昌，但有爱情厄，出国之字。\n10 凌 火：有爱情烦恼，清雅多才，中年成功隆昌，晚年吉祥。\n10 留 火：肯做肯劳，多才巧智，中年成功隆昌，出国之字。\n10 伦 火：学识渊博，官运旺盛，安富尊荣，出国之字，成功隆昌，孤独格。\n10 耄 火：孤独怪性，刑偶伤子，病弱短寿，难得幸福。\n10 纳 火：刑偶伤子，身弱多病，中年有灾，晚年吉祥。\n10 衲 火：温和贤淑，具有美德，中年劳或潦倒，晚年吉祥。\n10 能 火：刑偶伤子，中年奔波或劳苦，晚年吉祥，有爱情厄。\n10 娘 火：温和贤淑，肯做肯劳，勤俭持家，中年吉祥，晚年隆昌。\n10 秦 火：清秀巧妙，多才巧智，中年成功隆昌，出国之字。\n10 朔 火：英俊佳人，一生清雅多才，中年成功隆昌，出国之字，欠子之字。\n10 唐 火：福禄双收，谋为出众，中年不利，有灾难，晚年吉祥。\n10 讨 火：口快性刚，出外吉祥，中年劳或潦倒，晚年吉祥。\n10 特 火：口快心直，刑偶伤子，中年吉祥，晚年多灾，忌车怕水。\n10 恬 火：口快心直，性刚果断，晚婚大吉，中年吉祥，晚年多病。\n10 条 火：英俊佳人，清雅多才，中年成功隆昌，环境良好。\n10 庭 火：精明公正，义利分明，清雅荣贵，中年成功隆昌，出国之字。\n10 徒 火：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n10 夏 火：出外吉祥，小心爱情厄，多才贤能，秀气温和，中年劳，晚年隆昌。\n10 畜 火：一生清雅伶俐，中年吉祥，晚年隆昌。\n10 烜 火：学问丰富，有才能理智，中年成功隆昌，出国之字。\n10 旃 火：口快心直，多才有能，中年吉祥，晚年隆昌，环境良好。\n10 展 火：多才贤能，聪明伶俐，中年成功隆昌，出国之字。\n10 珍 火：口快多才，兄弟无靠，中年劳，成功隆昌，女人孤独，清秀伶俐。\n10 朕 火：刑偶伤子，出外吉祥，中年劳，晚年隆昌但劳神。\n10 值 火：义利分明，名利双收，温和贤能，成功隆昌，环境良好。\n10 秩 火：病弱短寿，忧心劳神，中年吉祥，晚年多病。\n10 致 火：理智充足，清雅荣贵，中年奔波劳苦，晚年吉祥。\n10 倬 火：怀才不遇，出外吉祥，一生多灾，难得成功，晚年吉祥。\n10 案 土：忧心劳神，事劳无功，一生困苦，多灾难。\n10 盎 土：带血字，出外吉祥，刑偶伤子，身弱短寿，中年劳，晚年吉祥。\n10 城 土：多才巧智，清雅温和，中年成功隆昌，晚年忧心劳神。\n10 峨 土：口快心直，身瘦多病，中年劳，晚年成功隆昌，出国之格。\n10 恩 土：清雅伶俐，多才多能，中年吉祥，晚年劳神，双妻之格。\n10 个 土：性刚灵活，孤独之格，英雄豪杰，中年多灾，晚年荣幸。\n10 埋 土：有爱情厄，忧心劳神，怀才不遇，中年多灾，晚年吉祥。\n10 破 土：不祥之字，病弱短寿或困苦，难得幸福。\n10 窃 土：清雅秀气，中年劳，晚年吉祥。\n10 容 土：福禄双收，多才伶俐，二子吉祥，中年隆昌，晚年清闲。\n10 翁 土：多才有能，温和伶俐，中年苦中得甘，晚年吉祥。\n10 峡 土：不详多灾，病弱短寿，一贫如洗，一生难幸福。\n10 十 土：温和贤淑，缘和四海，上下敦睦，成功隆昌。\n10 画 土：晚婚迟得子大吉，秀气伶俐，中年劳，晚年吉祥。\n10 宴 土：子孙兴旺，秀气多才，中年劳或有灾，晚年吉祥。\n10 晏 土：英敏之才，上下敦睦，出外贵人明现，官运旺，成功隆昌。\n10 殷 土：出外吉祥，清雅多才，中年劳或奔波，晚年隆昌。\n10 育 土：精明公正，义利分明，英俊人才，清雅荣贵，中年成功隆昌。\n10 员 土：二子吉祥，多才贤能，中年吉祥，福禄双收，晚年隆昌，欠子之字。\n10 袁 土：出外吉祥，多才无运，中年劳苦，晚年隆昌。\n10 砧 土：忧心劳神，多刑克，一生多灾，难得幸福，不祥之字。\n10 准 土：多才巧智，清雅伶俐，二子吉祥，中年成功隆昌。\n11 彩 金：清雅伶俐，多才巧智，中年平凡，晚年吉祥，双妻之格。\n11 参 金：肯做肯劳，重信义，三子吉祥，出外吉，中年劳，晚年吉祥。\n11 曹 金：一生清雅多才，晚婚大吉，中年劳，晚年隆昌。\n11 侧 金：重信用，一生清雅，中年多劳或奔波，晚年吉祥。\n11 钗 金：多才温和，清雅伶俐，中年劳，晚年吉祥。\n11 产 金：幼年辛苦，中年吉祥，晚年隆昌，环境良好，清荣之字。\n11 常 金：机谋多变，心性易动，中年吉祥，晚年劳神。\n11 唱 金：一生身弱短寿，刑偶伤子，中年吉祥，晚年隆昌。\n11 巢 金：早成功，早失败，中年成功，晚年劳苦，一生保守。\n11 晨 金：天生聪明，清雅荣贵，中年成功隆昌，出国之格，幸福之字。\n11 匙 金：清雅秀气，多才伶俐，中年吉祥，晚年劳神。\n11 崇 金：英俊多才，清雅荣贵，中年小心爱情厄，成功，环境良好。\n11 紬 金：多才伶俐，能干理智，中年有灾，怀才不遇，晚年吉祥。\n11 处 金：出外大吉，性格多变，中年劳，晚年吉祥。\n11 船 金：奔波劳苦，刑偶伤子，中年奔波，晚年吉祥。\n11 钏 金：忧心劳神，有爱情厄，中年劳苦，晚年吉祥。\n11 粗 金：秀气巧妙，多才伶俐，中年劳，晚年吉祥。\n11 得 金：晚婚迟得子大吉，中年多劳，晚年吉祥。\n11 钓 金：学识丰富，操守廉正，官运旺，中年成功隆昌，出国之字。\n11 钒 金：英俊清秀，有爱情厄，中年劳，晚年吉祥隆昌。\n11 副 金：多才巧智，内心多忧，怀才不遇，中年劳，晚年隆昌。\n11 寂 金：温和贤淑，勤俭伶俐，名利双收，出外吉祥，荣贵之字。\n11 祭 金：刑偶伤子，有爱情厄，中年离乱，晚年安详。\n11 旌 金：英俊佳人，上下敦睦，温和慈祥，成功隆昌，环境良好。\n11 勘 金：欠子或多子，刑偶之字，中年吉庆，环境良好，晚年身闲。\n11 馗 金：多才贤能，精明公正，中年平凡，晚年隆昌，荣华之字。\n11 率 金：身弱短寿，一贫如洗，中年多灾，晚年吉祥。\n11 佩 金：秀气巧妙，多才巧智，中年成功隆昌，清雅荣贵。\n11 阡 金：环境良好，一生清雅，中年成功隆昌，荣贵之字。\n11 雀 金：身瘦秀气，克父命，小心爱情厄，中年吉祥，晚年劳神，短寿之字。\n11 商 金：福禄有进，名利有份，中年劳神，晚年吉祥，幸福之字。\n11 绍 金：义利分明，智勇双全，带刀厄，刑偶欠子，官旺，晚年隆昌。\n11 设 金：一生清雅多才，刑偶伤子，出外吉祥，有爱情厄，自杀短寿。\n11 赦 金：奔波劳苦，性刚口快，中年多劳，晚年吉祥。\n11 绅 金：有爱情厄，清雅多才，温和慈祥，晚年隆昌。\n11 庶 金：勤俭建业，家声克振，官运旺，中年平凡，晚年吉祥，清雅荣贵。\n11 爽 金：性格复杂，有能无运，中年吉祥，晚年劳神。\n11 讼 金：口才伶俐，天生聪明，一生清雅伶俐，成功隆昌，环境良好。\n11 宿 金：忧心劳神，事劳无功，中年吉祥，晚年劳神，守寡之字。\n11 问 金：福禄双收，多才伶俐，命硬，有破相之灾，忌车怕水，晚年吉祥。\n11 悉 金：忧心劳神，肯做肯劳，无运多灾，有爱情厄，再嫁守寡之字。\n11 细 金：智勇双全，清雅伶俐，中年成功隆昌，环境良好，有爱情厄。\n11 祥 金：英敏伶俐，天生聪明，刑偶欠子，暗淡不幸，晚年吉祥。\n11 斜 金：出外吉祥，贵人明现，中年多劳，晚年吉祥。\n11 羞 金：忧心劳神，身弱多病，中年多灾，晚年享福。\n11 袖 金：出外大吉，勤俭持家，清雅伶俐，中年平，晚年吉祥。\n11 旋 金：才智出众，福禄双收，出外吉祥，刑偶之字，晚年隆昌。\n11 悦 金：清雅伶俐，多才巧智，出外吉祥，刑偶伤子，成功隆昌。\n11 责 金：智勇双全，一生清雅荣贵，二子吉祥，成功隆昌，环境良好。\n11 扎 金：有爱情厄，温和贤能，中年劳或潦倒，晚年吉祥。\n11 趾 金：秀气多才，贤能伶俐，中年有灾，晚年幸福吉祥。\n11 终 金：暗淡无光，不祥之字，难成功，多灾难，不幸之字。\n11 珠 金：有爱情烦恼，病弱短寿，多灾难，晚年吉祥。\n11 专 金：清雅秀气，事劳无功，刑偶多灾，中年劳，晚年吉祥。\n11 紫 金：有爱情厄，秀气伶俐，中年吉祥，晚年劳神，多病或短寿。\n11 组 金：福禄双收，清雅荣贵，中年劳，晚年吉祥。\n11 彬 木：清雅荣贵，多才巧智，智勇双全，阴藏不露，不祥之格。\n11 笞 木：少乐多忧，怀才不遇，福禄双收，中年吉祥，晚年隆昌。\n11 崔 木：一生清雅，理智充足，中年劳苦，晚年吉祥。\n11 笛 木：清雅多才，理智充足，中年吉祥，晚年吉昌，荣贵之字。\n11 偶 木：忧心劳神，怀才不遇，命途多舛，中年多灾，晚年吉祥。\n11 符 木：刑偶伤子，清雅身瘦，中年奔波，晚年吉祥。\n11 敢 木：性刚口快，意志坚强，抱负大，中年多灾，晚年吉祥。\n11 梗 木：刑偶欠子，克父命，温和伶俐，中年劳，晚年吉祥，短寿之字。\n11 规 木：理智充足，性刚口快，一生清闲，中年劳，晚年吉祥。\n11 国 木：多才巧智，清雅伶俐，忌车怕水，教育界大吉，成功隆昌，官旺之字。\n11 悍 木：性刚果断，通奸害夫，被杀杀人，恶死凶亡。\n11 寄 木：为人快乐，内心多忧，身弱多灾，中年劳，晚年吉祥。\n11 袈 木：性刚果断，刑偶伤子，中年劳苦，晚年吉祥，劳神之字。\n11 坚 木：清雅荣贵，智勇双全，中年成功隆昌，出国之格，官旺之字。\n11 彬 木：清雅荣贵，多才巧智，智勇双全，阴藏不露，不祥之格。\n11 笞 木：少乐多忧，怀才不遇，福禄双收，中年吉祥，晚年隆昌。\n11 崔 木：一生清雅，理智充足，中年劳苦，晚年吉祥。\n11 笛 木：清雅多才，理智充足，中年吉祥，晚年吉昌，荣贵之字。\n11 偶 木：忧心劳神，怀才不遇，命途多舛，中年多灾，晚年吉祥。\n11 符 木：刑偶伤子，清雅身瘦，中年奔波，晚年吉祥。\n11 敢 木：性刚口快，意志坚强，抱负大，中年多灾，晚年吉祥。\n11 梗 木：刑偶欠子，克父命，温和伶俐，中年劳，晚年吉祥，短寿之字。\n11 规 木：理智充足，性刚口快，一生清闲，中年劳，晚年吉祥。\n11 健 木：智勇双全，操守廉正，中年成功隆昌，清雅荣贵，出外大吉，官旺。\n11 皎 木：少年秀气伶俐，中年多才，名利双收，晚年环境良好。\n11 教 木：吉凶分明，吉则成功隆昌，环境良好，凶则一生多病，孑然一生。\n11 近 木：奔波劳苦，多才巧智，潦倒一生，晚年享福。\n11 竟 木：工程界大吉，英敏多才，出外吉祥，晚年隆昌。\n11 救 木：出外吉祥，晚婚迟见子吉，中年隆昌，晚年吉祥。\n11 眷 木：多乐少忧，身弱多病，忌车怕水，中年多劳，晚年享福。\n11 康 木：一生清雅伶俐，多有才能，中年身弱，晚年吉祥。\n11 寇 木：一生多灾，性刚果断，中年奔波，晚年吉祥。\n11 苦 木：命途多舛，一生贫困，难得幸福，病弱短寿，恶死凶亡。\n11 笠 木：刑偶伤子，病弱短寿，清秀多才，晚年吉祥。\n11 茂 木：刑偶伤子，双妻之格，清雅多才，中年劳，晚年隆昌，忌车怕水。\n11 梅 木：小心爱情厄，吉凶分明，出国成功隆昌，自杀不幸，一生多灾。\n11 启 木：清雅荣贵，刑偶欠子，中年吉祥，出国之格，身弱短寿。\n11 乾 木：清雅荣贵，长寿多才，克己助人，中年吉祥，晚年隆昌，女人刑偶伤子，晚婚大吉。\n11 卿 木：有爱情厄，忧心劳神，刑偶伤子，性刚，晚年吉祥，不祥之字。\n11 顷 木：二子吉祥，中年劳，晚年隆昌吉祥。\n11 区 木：忧心劳神，身弱多病，中年多灾，晚年吉祥。\n11 圈 木：清雅荣贵，重信用，中年吉祥，环境良好。\n11 若 木：福禄双收，孤独格，刑偶伤子，中年潦倒，晚年吉祥。\n11 梢 木：刑偶伤子，一生清雅多才，中年多劳，晚年吉祥，欠子之字。\n11 苕 木：带刀厄运缠身，刑偶伤子，中年吉祥，福禄双收。\n11 笙 木：精力旺盛，双妻之格，名利有份，幸福之字。\n11 倏 木：天生聪明，多才多能，中年勤俭建业，成功隆昌，出国之字。\n11 崧 木：学识渊博，操守廉正，中年成功隆昌，环境良好，出国之字。\n11 梯 木：一生清雅伶俐，理智充足，英雄豪杰，中年成功隆昌。\n11 桶 木：离祖成功，清雅多才，忌车怕水，中年劳，晚年隆昌。\n11 梧 木：清雅多才，义利分明，中年吉祥，晚年隆昌，环境良好。\n11 悟 木：性刚口快，豪爽伶俐，福禄双收，名利有份，成功隆昌。\n11 晤 木：清雅伶俐，多才有能，中年吉祥，环境良好，名利双收。\n11 偕 木：出外吉祥，晚婚迟见子吉，中年劳，晚年吉祥享福。\n11 械 木：口快性刚，忌车怕水，病弱短寿，刑克父母，晚年吉祥。\n11 许 木：一生清雅平凡，多才伶俐，中年劳，晚年吉祥。\n11 研 木 ：刑克父母，刑偶伤子，中年多劳，晚年吉祥。\n11 眼 木：忧心劳神，事劳无功，潦倒一生，晚年吉祥。\n11 翊 木：有爱情厄，清秀巧妙，多才但中年多灾，晚年吉祥。\n11 英 木：天生聪明，气度恢弘，中年成功隆昌，小心爱情厄，出国之格。\n11 苑 木：秀气英敏，义利分明，贵人明现，中年成功隆昌，享福之字。\n11 梓 木：一生清雅荣贵，智勇双全，官运旺，成功隆昌，环境良好。\n11 绊 水：有爱情厄，多才巧智，清雅伶俐，中年有灾，晚年吉祥。\n11 邦 水：孤独格，兄弟无缘，多才伶俐，英敏巧智，中年隆昌，晚年劳神，欠子之字。\n11 败 水：生在富家，败散或恶死凶亡，不幸之字，暗淡多灾。\n11 胞 水：刑偶伤子，身弱多病，清雅伶俐，晚年吉祥。\n11 被 水：口快性刚，事劳无功，身弱短寿，一生幸福。\n11 匾 水：多才巧智，一生清雅贤能，中年隆昌，环境良好，荣幸之字。\n11 彪 水：智勇双全，清雅多才，中年劳，晚年吉祥，武官大吉。\n11 斌 水：多才伶俐，清雅荣贵，成功隆昌，忌车怕水，短寿之字。\n11 捕 水：贫苦渐进，白手成家，中年吉祥，晚年劳神。\n11 讹 水：忧心劳神，身弱多病，中年奔波，晚年吉祥。\n11 苗 水：秀气巧妙，清雅贤淑，中年吉祥，晚年隆昌。\n11 徘 水：一生清雅平凡，保守之格，中年潦倒，晚年吉祥。\n11 婞 水：小心爱情厄，清雅多才，中年隆昌，晚年劳神。\n11 贩 水：一贫如洗，潦倒一生，中年多灾，难得幸福，忧心劳神。\n11 访 水：勤俭建业，家声克振，福禄双收，环境良好，晚年劳神。\n11 浮 水：虚荣心强，清雅伶俐，中年多劳，晚年享福。\n11 妇 水：秀气温和，暗淡之字，中年有灾，晚年吉祥。\n11 海 水：忧心劳神，多才清雅，中年吉祥，晚年劳神。\n11 毫 水：多才巧智，义利分明，清雅伶俐，中年劳，晚年吉祥。\n11 浩 水：学问丰富，清雅荣贵，福禄双收，官运旺，成功隆昌。\n11 凰 水：天生聪明，清雅荣贵，中年成功隆昌，官运旺，荣贵之字。\n11 晦 水：英俊之才，勤俭多才，家声克振，中年成功隆昌，荣贵之字。\n11 婚 水：刑偶伤子，一生清雅伶俐，晚婚吉，中年劳，晚年吉祥。\n11 货 水：忧心劳神，事劳无功，一生中年劳，晚年吉祥。\n11 浸 水：忧愁困苦，一生贫贱，病弱短寿，多灾难，晚年享福。\n11 涓 水：清雅伶俐，多才巧智，有爱情厄，中年吉祥，晚年劳神。\n11 浚 水：英敏多才，清雅荣贵，中年成功隆昌，出国富贵。\n11 浪 水：性刚果断，奔波劳苦，晚婚吉祥，中年多劳，晚年吉祥。\n11 流 水：晚婚迟见子或欠子，贵人明现，中年奔波，晚年荣幸。\n11 麻 水：清雅多才，一生福禄双收，中年劳苦，晚年吉祥，环境良好。\n11 麦 水：忧心劳神，损丁破财，有爱情烦恼，晚年享福。\n11 曼 水：理智充足，清雅荣贵，出国之格，中年成功隆昌。\n11 密 水：刑偶伤子，口快心直，中年潦倒，晚年吉祥。\n11 敏 水：有爱情厄，多才温和，清雅荣贵，出国之格，劳神之字。\n11 胖 水：刑偶伤子，忧心劳神，中年潦倒，晚年吉祥。\n11 袍 水：出外逢贵得财，中年多灾，身弱短寿，晚年吉祥。\n11 匏 水：忧心劳神，百事苦劳，病弱短寿，恶死凶亡。\n11 偏 水：口快性刚，清雅多才，中年多灾，晚年劳神。\n11 票 水：有爱情厄，一生清雅伶俐，中年多灾，晚年吉祥。\n11 婆 水：一贫如洗，忧心劳神，中年多灾，潦倒一生，晚年享福。\n11 粕 水：秀气端庄，温和贤淑，夫妻相和，一门鼎盛，成功隆昌。\n11 浦 水：勤俭建业，家声克振，中年有灾，出国吉祥，成功隆昌。\n11 涕 水：秀气多才，温和贤能，中年吉祥，一生安享幸运。\n11 涂 水：英俊才人，清雅荣贵，一门鼎盛，中年吉祥，安详之字。\n11 晚 水：刑偶欠子，中年劳苦，有离乱之祸，晚年隆昌。\n11 望 水：清雅荣贵，多才伶俐，官旺格，中年劳，晚年吉祥。\n11 习 水：天生聪明，勤俭建业，成功隆昌，女人不幸多灾，短寿之字。\n11 涎 水：精明公正，克己助人，中年成功隆昌，官运旺，享福之字。\n11 消 水：暗淡无光，忧心劳神，刑偶伤子，中年劳，晚年吉祥。\n11 虚 水：多愁少乐，事劳无功，一生多灾，难得幸福。\n11 雪 水：薄幸之字，再嫁守寡，中年多灾，晚年吉祥。\n11 鱼 水：一生清雅多才，温和贤能，福禄双收，中年劳，晚年吉祥。\n11 浴 水：福禄双收，义利分明，中年吉祥，双妻之格，晚年劳神。\n11 浙 水：忧心劳神，事劳无功，中年有灾，晚年隆昌。\n11 敕 火：刑克父母，孤独奔波，中年多灾，晚年吉祥。\n11 从 火：离祖成功，清雅多才，中年成功隆昌，环境良好，福寿兴家。\n11 带 火：身犯破，身弱多病，中年有爱情烦恼，再嫁守寡，晚年吉祥。\n11 袋 火：奔波劳苦，身弱多病，孤寡一生，中年困苦，晚年享福。\n11 盗 火：不祥之字，忧心劳神，一生潦倒，晚年享福。\n11 顶 火：身弱短寿，刑偶欠子，中年劳苦，晚年吉祥。\n11 动 火：清雅多才，刑偶伤子，口快心直，中年劳，晚年隆昌，双妻之格。\n11 烽 火：多才巧智，温和贤能，工程界大吉，中年平凡，晚年成功隆昌。\n11 斛 火：性刚口快，出外吉祥，中年隆昌，环境良好。\n11 将 火：病弱短寿，多忧少乐，环境良好，忌车怕水，荣贵隆昌。\n11 狷 火：有爱情烦恼，少年艰难，中年吉祥，晚年劳神，欠子之字。\n11 梨 火：刑偶伤子，清雅多才，中年有灾，晚年吉昌，环境良好。\n11 犁 火：忧心劳神，忌车怕水，中年劳苦，晚年吉祥。\n11 粒 火：忧心劳神，身弱短寿，离乱不幸，再嫁守寡之字。\n11 梁 火：一生清雅，多才口快性刚，中年奔波，劳苦，晚年吉祥。\n11 聊 火：一生清雅平凡，保守之格，中年劳，晚年吉祥。\n11 羚 火：清荣伶俐，学识丰富，中年成功隆昌，官运旺，出国之字。\n11 翎 火：学问丰富，操守廉正，官运旺，清雅荣贵，出国之字。\n11 聆 火：清雅秀气，多才贤能，中年吉祥，晚年隆昌，幸福之字。\n11 鹿 火：秀气多才，清雅荣贵，重情失败，中年劳，晚年吉祥。\n11 略 火：义利分明，天生聪明，福禄双收，成功隆昌，环境良好。\n11 那 火：清雅伶俐，秀气巧妙，中年成功隆昌，晚年劳神。\n11 戚 火：一生清雅多才，清闲享福，中年多劳，晚年吉祥。\n11 软 火：一生清雅秀气，保守平凡，中年劳，苦中得甘，晚年吉祥。\n11 晟 火：一生安详多才，子孙兴旺，中年吉祥，官运旺，出国之字。\n11 胎 火：清雅伶俐，多才贤能，中年吉祥，成功隆昌，欠子之字。\n11 悌 火：智勇双全，天生聪颖，中年成功隆昌，清雅荣贵，出国之字。\n11 停 火：有爱情烦恼，病弱短寿，刑偶伤子，中年多灾，晚年吉祥。\n11 豚 火：刑偶欠子，出外吉祥，中年多劳，晚年吉祥。\n11 袜 火：忧心劳神，刑偶伤子，中年多劳，晚年吉祥。\n11 烷 火：多才巧智，温和贤能，中年吉祥，成功隆昌，晚年劳神。\n11 张 火：性刚口快，克父命，中年潦倒或奔波，晚年吉祥。\n11 章 火：出外贵人明现，晚婚大吉，双妻之格，中年劳，晚年吉祥荣贵。\n11 帐 火：过房之格，一生清雅多才，中年劳，晚年吉祥。\n11 侦 火：福禄双收，名利永在，二子吉祥，清雅荣贵，中年成功隆昌。\n11 振 火：清雅多才，温和贤淑，双妻之格，中年成功隆昌，二子吉祥。\n11 执 火：性刚果断，身弱短寿，出外吉祥，忌车怕水，晚福之字。\n11 庵 土：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n11 崩 土：刑偶伤子，刑克父母，一生多灾，难得幸福，病弱短寿。\n11 胡 土：多才巧智，清雅伶俐，中年虽劳，成功隆昌，晚年子孙兴旺。\n11 基 土：口快性刚，配合吉成功隆昌，配合凶杀人被杀，有牢狱之灾。\n11 堀 土：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n11 培 土：勤俭建业，家声克振，中年吉祥，出国之字，名利双收。\n11 崎 土：忧心劳神，有意外之灾，多才伶俐，福禄有份，晚年吉祥。\n11 牵 土：刑偶伤子，忌车怕水，中年多灾，一生难幸福，短寿之字。\n11 堂 土：刑偶伤子，多才有能，中年成功隆昌，晚年损丁破财，劳神之字。\n11 窕 土：秀气巧妙，温和贤淑，小心爱情厄，出外吉祥，晚年享福。\n11 眺 土：常有祸端，身弱短寿，中年多灾，晚年享福。\n11 婉 土：清雅秀气，有才能理智，中年成功隆昌，出国之格。\n11 唯 土：衣食丰足，清雅贤能，福禄双收，成功隆昌。\n11 伟 土：多才巧智，清雅伶俐，小心爱情厄，中年成功隆昌，晚年吉祥。\n11 尉 土：多才巧智，天生伶俐，中年吉祥，晚年隆昌，荣幸之字。\n11 偃 土：刑偶伤子，晚婚迟得子大吉，中年劳，晚年吉祥。\n11 野 土：一生清雅温和，中年吉祥，晚年隆昌，劳神之字。\n11 移 土：有爱情厄，刑偶伤子，命途多舛，中年劳，晚年吉祥。\n11 异 土：智勇双全，二子吉祥，克己助人，内心多忧，晚年吉祥。\n11 寅 土：一生清雅多才，保守之格，官旺，中年吉祥，晚年劳神。\n11 庸 土：义利分明，温和贤能，事业吉昌，环境良好，欠子之字。\n11 悠 土：清雅伶俐，多才巧智，中年劳，但吉祥，晚年隆昌，劳神之字。\n11 域 土：怀才不遇，病弱短寿，中年多灾，晚年吉祥，劳苦之字。\n11 欲 土：刑偶伤子，奔波劳苦，晚婚大吉，中年劳，晚年吉祥。\n11 峥 土：外观幸福，内心多忧，一生清雅平凡，多才伶俐，成功吉祥。\n12 裁 金：胆识丰富，清雅荣贵，中年吉祥，多才贤能，晚年劳神。\n12 残 金：忧心劳神，事劳无功，身弱短寿，女人再嫁之字。\n12 钞 金：忧心劳神，事劳无功，中年虽劳，晚年吉祥。\n12 超 金：带刀厄，刑偶伤子，中年吉祥，智勇双全，晚年劳神，出国之字。\n12 朝 金：智勇双全，名利双收，清雅荣贵，晚年成功隆昌。\n12 窗 金：忧心劳神，怀才不遇，中年奔波或劳苦，晚年吉祥。\n12 创 金：带刀厄，英敏秀气，清雅伶俐，二子吉祥，中年劳，晚年隆昌。\n12 词 金：一生清雅伶俐，名利双收，福寿荣贵，中年隆昌，环境良好。\n12 措 金：温和贤淑，福寿兴家，中年吉祥，晚年隆昌，慈祥之字。\n12 钝 金：清雅多才，秀气英俊，中年劳，晚年吉祥，环境良好。\n12 贰 金：二子吉祥，一生清雅多才，中年劳，晚年吉祥，子孙兴旺。\n12 舒 金：一生清雅荣贵，理智充足，中年平凡，晚年吉祥。\n12 黍 金：忧心劳神，事劳无功，中年多劳，晚年吉祥。\n12 割 金：带刀厄，忧心劳神，事劳无功，一生平凡，多灾难，短寿之字。\n12 壶 金：有爱厄，清秀伶俐，福禄双收，出外吉祥，荣贵之字。\n12 绝 金：不祥之字，多灾难，病弱短寿，一生难幸福，再嫁守寡之字。\n12 钧 金：学识渊博，操守廉正，克己助人，清雅荣贵，富贵之字。\n12 竣 金：名利双收，出外贵人现，官运旺，出国之字，成功隆昌。\n12 钠 金：天生聪颖，清雅荣贵，中年平凡，晚年吉昌，环境良好。\n12 甯 金：天生聪颖，多才贤能，中年吉祥，晚年隆昌，环境良好，出国之格。\n12 钮 金：有爱情烦恼，清雅伶俐，中年多灾，晚年吉祥，刑偶伤子。\n12 钦 金：克父命，一生清雅平凡，中年劳，晚年隆昌，荣贵之字。\n12 情 金：刑偶伤子，一生清雅伶俐，有爱情厄，晚年吉祥。\n12 然 金：天生聪明，清雅荣贵，中年吉祥，晚年隆昌，环境良好。\n12 韧 金：奔波劳苦，有爱情烦恼，中年多灾，晚年吉祥。\n12 绒 金：性刚清雅，少年艰难，有爱情厄，中年劳，晚年吉昌。\n12 散 金：刑偶伤子，出外大吉，中年劳苦多灾，晚年吉祥。\n12 善 金：福禄双收，名利有份，温和贤能，中年吉祥，晚年隆昌。\n12 稍 金：刑偶伤子，一生清雅伶俐，小心爱情厄，晚年吉祥。\n12 胜 金：英敏之才，早婚短寿，晚婚平静，中年有灾，晚年吉祥。\n12 甥 金：一生清雅多才，英俊贤能，中年劳，晚年环境良好。\n12 盛 金：带血字，多相克，因爱情而意外自杀或牢狱，忌车怕水，短寿之字。\n12 剩 金：带刀厄，暗淡无光，一贫如洗，病弱短寿，多灾难。\n12 视 金：性刚口快，英雄格，出外吉祥，中年劳，晚年劳神多病。\n12 授 金：肯做肯劳，重信义，中年多灾，晚年吉祥，短寿之字。\n12 税 金：出外吉祥，一生清雅多才，中年劳，晚年吉祥，欠子之字。\n12 顺 金：多才贤能，清雅荣贵，中年平凡，晚年吉祥，忌车怕水。\n12 舜 金：英俊佳人，清雅多才，中年平凡或奔波，晚年吉祥，克父之字。\n12 丝 金：清秀伶俐，温和贤能，中年吉祥，晚年隆昌，安详之字。\n12 斯 金：学识丰富，清雅荣贵，官运旺，福寿兴家，环境良好。\n12 俟 金：忧心劳神，怀才不遇，二子吉祥，中年平凡，晚年隆昌。\n12 竦 金：刑偶伤子，中年吉祥，清雅伶俐，晚年劳神，欠子之字。\n12 诉 金：忧心劳神，清雅多才，中年多灾，晚年吉祥享福。\n12 替 金：忧心劳神，刑偶伤子，中年有灾，晚年吉祥，欠子之字。\n12 童 金：一生清雅多才，贤能聪明，中年劳但吉祥，晚年劳神。\n12 推 金：清雅秀气，多才有能，有损丁刑偶之厄，晚年吉祥。\n12 惜 金：温和慈祥，多才清雅，晚婚迟得子大吉，环境良好。\n12 羡 金：清雅伶俐，多才巧智，刑偶伤子，或有爱情厄，中年劳，晚年吉祥。\n12 象 金：刑偶伤子，英雄豪杰，中年奔波多劳，晚年吉祥，双妻之格。\n12 琇 金：秀气巧妙，温和贤能，小心爱情厄，成功吉祥，出国之字。\n12 须 金：三子命中存，有才能理智，中年劳，晚年吉祥，子孙隆昌。\n12 絮 金：有爱情烦恼，身弱多病，清雅伶俐，中年劳，晚年吉祥。\n12 绚 金：秀气伶俐，清雅温和，晚得子吉，中年吉祥，晚年身弱多病。\n12 喻 金：智勇双全，名利双收，一生清雅荣贵，中年成功隆昌。\n12 曾 金：一生清雅多才，贤能荣幸，迟得子大吉，成功隆昌，环境良好。\n12 诈 金：一生困苦，百事劳苦，清雅平凡，出外吉祥，晚年劳神。\n12 掌 金：性刚，英雄慷慨，一生清雅多才，中年劳，晚年吉祥。\n12 诏 金：带刀厄，一生清雅荣贵，官运旺，刑偶欠子。\n12 帧 金：忠厚善良，义利分明，中年隆昌，二子吉祥，晚年劳神。\n12 脂 金：刑偶伤子，清雅伶俐，中年多灾，晚年吉祥隆昌。\n12 殖 金：清雅伶俐，多才巧智，小心爱情厄，中年劳，晚年隆昌。\n12 众 金：一生福禄双收，荣贵吉祥，出外大吉，中年劳，晚年隆昌。\n12 贮 金：忧心劳神，刑偶伤子，中年劳苦，晚年吉祥。\n12 注 金：性朴素有美德，中年吉祥，晚年隆昌，荣贵，环境良好。\n12 兹 金：有爱情烦恼，温和贤能，中年平凡，晚年吉祥。\n12 尊 金：一生多才伶俐，刑偶伤子，中年多劳，晚年吉祥，清平之字。\n12 棒 木：刑克父母，少年艰难，中年多劳，晚年吉祥隆昌，荣幸之字。\n12 草 木：外观幸福，内心多忧，中年忌车怕水，晚年吉祥。\n12 策 木：二子吉祥，名利双收，多才温和，中年劳，晚年吉祥。\n12 茶 木：刑偶伤子，中年多劳，晚年吉祥隆昌。\n12 答 木：克妻欠子，温和伶俐，中年多灾，晚年吉祥，双妻之格。\n12 等 木：忧心劳神，刑偶伤子，中年劳苦，晚年吉祥，忌车怕水。\n12 棣 木：多愁多忧，百事劳苦，中年劳，晚年吉祥。\n12 迭 木：暗淡无光，不祥之字，命途多舛，短寿自杀。\n12 栋 木：忧心劳神，刑偶伤子，清雅荣贵，官运旺，晚年劳神，忌车怕水。\n12 筏 木：忧心劳神，晚婚迟得子吉，中年吉祥，晚年劳神，福寿之字。\n12 棉 木：清雅伶俐，天生多才，中年吉祥，晚年隆昌，环境良好，幸福之字。\n12 棼 木：带刀厄，刑偶伤子，刑克父母，中年劳，晚年隆昌，多相克之字。\n12 给 木：清雅荣贵，中年成功隆昌，晚年劳神，环境良好。\n12 贯 木：一生清雅，环境良好，中年有灾，晚年吉祥，二子吉祥。\n12 贵 木：一生多才巧智，身瘦伶俐，中年劳，晚年吉祥隆昌，名利双收。\n12 棍 木：英俊佳人，多才巧智，清雅荣贵，中年吉祥，晚年隆昌。\n12 皓 木：智勇双全，清雅荣贵，官运旺，妻贤子贵，成功隆昌。\n12 荒 木：刑偶伤子，身弱多病，中年多灾，晚年吉祥。\n12 极 木：吉凶分明，吉则义利分明，克己助人，成功隆昌，凶则多灾难，难得幸福。\n12 集 木：忧心劳神，有爱情厄，中年吉祥，晚年劳神。\n12 几 木：奔波劳苦，身弱多病，有爱情厄，中年潦倒，晚福之字。\n12 间 木：刑偶伤子，忧心劳神，晚婚大吉，中年劳，晚年吉祥。\n12 蛟 木：欢乐一生，慷慨精诚，有成人之美德，中年吉祥，出外大吉。\n12 绞 木：有爱情烦恼，病弱短寿，清雅多才，多灾难之字。\n12 街 木：一生多相克，身弱多病，中年劳，晚年吉祥。\n12 杰 木：智勇双全，清雅荣贵，中年吉祥，晚年隆昌，二子吉祥。\n12 结 木：一生清雅多才，义利分明，中年成功隆昌，晚年劳神。\n12 景 木：多才贤能，精明公正，中年成功隆昌，环境良好。\n12 窘 木：清雅多才，身弱短寿，刑偶伤子，中年劳苦，晚年吉祥。\n12 掘 木：忧心劳神，事劳无功，中年多灾，晚年吉祥，但劳神。\n12 开 木：刑克父母，孤独格，少年艰难，中年奔波，晚年吉祥。\n12 凯 木：性刚果断，智勇双全，出外吉祥，中年隆昌，环境良好，多才之字。\n12 筐 木：性刚果断，病弱短寿，中年多舛，晚年吉祥。\n12 棱 木：清雅多才，理智充足，出外吉祥，中年平，晚年隆昌。\n12 络 木：理智充足，清雅秀气，中年有灾，晚年吉昌。\n12 棚 木：刑偶伤子，有爱情厄，忌车怕水，中年多灾，晚年吉祥。\n12 期 木：英敏多才，上下敦睦，清雅伶俐，中年吉祥，晚年隆昌，环境良好。\n12 欺 木：多忧少乐，刑偶伤子，中年多灾，身弱短寿，晚年劳神。\n12 棋 木：福禄双收，名利有份，中年吉祥，晚年隆昌，环境良好，英俊之字。\n12 茜 木：清雅秀气，智勇双全，安富尊荣，出国之字。\n12 嵌 木：刑克父母，芎偶伤子，晚婚吉祥，中年奔波，晚年隆昌，幸福之字。\n12 强 木：清雅荣贵，有才能理智，中年劳或奔波，晚年吉祥，官旺。\n12 乔 木：清雅多才，福禄双收，中年吉祥，晚年隆昌，出国之字。\n12 球 木：贵人明现，清雅多才，精明公正，中年成功隆昌，荣贵之字。\n12 荃 木：口快性刚，多才伶俐，清雅多能，中年吉祥，晚年劳神。\n12 筌 木：多才伶俐，清雅多能，子孙兴旺，中年吉祥，晚年隆昌。\n12 荏 木：精明公正，多才荣贵，中年吉祥，出国之格。\n12 茸 木：勤俭起家，清雅荣贵，多才有能，成功隆昌，女人不幸，再嫁之字。\n12 森 木：凶死恶亡，配合吉亦生祸端，或有爱情厄，凶则身弱短寿，不祥之字。\n12 棠 木：英俊多才，刑偶或伤子，晚婚大吉，中年吉祥，晚年隆昌。\n12 统 木：智勇双全，操守廉正，中年劳或多灾，晚年吉祥。\n12 筒 木：清雅多才，名利双收，中年平凡，晚年吉祥，环境良好。\n12 皖 木：忧心劳神，刑偶伤子，中年多灾，晚年吉祥。\n12 稀 木：性刚果断，少年艰难，中年多劳或奔波，晚年吉祥。\n12 雅 木：英俊多才，秀气贤淑，中年吉祥，晚年隆昌，出国之格。\n12 雁 木：出外或离祖吉祥，中年奔波或劳苦，晚年吉祥，双妻之格。\n12 尧 木：克父伤妻，一生清雅多才，官运旺，中年吉祥，晚年劳神。\n12 椅 木：刑偶伤子，福禄双收，中年多劳或奔波，晚年吉祥。\n12 硬 木：克父命，刑偶欠子，出外贵人现，福禄双收，晚年隆昌，短寿之字。\n12 寓 木：温和伶俐，天生聪明，一生清雅平凡，保守之字。\n12 栈 木：有爱情厄，刑偶伤子，中年多灾或潦倒，晚年吉祥。\n12 植 木：一生重义守信，名利双收，中年吉祥，晚年隆昌，幸福之字。\n12 茱 木：秀气伶俐，温和多才，中年成功隆昌，清雅荣贵，二子吉祥。\n12 最 木：智勇双全，教育界大吉，官运旺，中年吉祥，环境良好。\n12 傍 水：忧心劳神，清雅伶俐，有才无运，难成功，晚年吉祥。\n12 棓 水：刑偶伤子，多才巧智，成功隆昌，晚年劳神。\n12 报 水：奔波劳苦，少年艰难，中年劳苦，忌车怕水，短寿之字。\n12 悲 水：多忧少乐，身弱短寿，中年不幸，离乱不祥。\n12 备 水：智勇双全，出外大吉，中年劳，吉祥，晚年隆昌，名利之字。\n12 弼 水：智勇双全，官或财旺，中年成功隆昌，环境良好。\n12 博 水：智勇双全，多才巧智，中年奔波，晚年隆昌。\n12 淳 水：一生清雅伶俐，勤俭励业，福寿兴家，环境良好。\n12 淡 水：晚婚迟得子大吉，暗淡无光，不幸多灾，难得幸福。\n12 发 水：刑偶伤子，清雅多才，中年多劳，晚年吉祥，忌车怕水，短寿破相。\n12 淋 水：官缘得禄，操守廉正，官运旺，成功隆昌，环境良好。\n12 排 水：忧心劳神，事劳无功，忌车怕水，中年多灾，晚年吉祥。\n12 淑 水：温和伶俐，有爱情厄，或身弱，中年吉祥，晚年劳神。\n12 雄 水：配合善，中年成功隆昌，不善，忌车怕水，恶死凶亡。\n12 番 水：智勇双全，清爽多才，中年吉祥，晚年成功隆昌，出国之字。\n12 防 水：贵人明现，一生清雅多才，刑偶伤子，晚年吉昌。\n12 扉 水：清雅平凡，一生保守，上下敦睦，中年劳，晚年吉祥。\n12 斐 水：聪明伶俐，多才秀气，中年吉祥，晚年环境良好。\n12 冯 水：一生清雅，福禄双收，中年劳或奔波，晚年吉祥。\n12 幅 水：刑克父母，少年艰难，中年劳苦，晚年吉祥，晚福之字。\n12 复 水：英俊佳人，身瘦多才，出外大吉，中年平凡，晚年吉祥，荣幸之字。\n12 富 水：一生清雅荣贵，中年吉祥，晚年隆昌，环境良好，荣华之字。\n12 淦 水：天生聪明，多才有能，清雅荣贵，中年成功隆昌，环境良好。\n12 蛤 水：一生清雅多才，衣食丰足，中年劳，晚年吉祥，多疾之字。\n12 寒 水：消极而暗淡，一生劳苦，多灾难，身弱短寿，忌车怕水，二子吉祥。\n12 贺 水：二子吉祥，精明公正，智勇双全，官运旺，中年成功隆昌。\n12 唤 水：一生多劳，多灾难，刑偶伤子，病弱短寿，不幸之字。\n12 徨 水：义利分明，晚婚迟见子吉，中年平凡，晚年隆昌，官运旺。\n12 惠 水：天生聪明，秀气伶俐，名利双收，中年吉祥，晚年子孙旺盛。\n12 混 水：英俊佳人，多才伶俐，中年吉祥，晚年隆昌，欠子之字。\n12 买 水：忧心劳神，事劳无功，刑偶欠子，中年多灾，晚年吉祥，双妻之格。\n12 贸 水：二子吉祥，清雅荣贵，中年吉祥，晚年隆昌，环境良好。\n12 帽 水：忧心劳神，事劳无功，多灾难，抱恨九泉。\n12 媒 水：有爱情烦恼，一生多劳，或潦倒，晚年吉祥。\n12 媚 水：聪明伶俐，秀气多才，温和贤淑，成功隆昌。\n12 闷 水：内心多忧，身弱多病，清雅伶俐，中年吉祥，晚年多灾。\n12 猛 水：雄壮厚重，少年艰难，中年成功隆昌，子孙兴旺，带血字短寿。\n12 闵 水：智勇双全，义利分明，一生清雅荣贵，中年成功隆昌，忌车怕水。\n12 评 水：教育界大吉，温和贤能，中年吉祥，晚年劳神多病。\n12 迫 水：奔波劳苦，身弱多病，中年吉祥，晚年劳神。\n12 普 水：二子吉祥，清雅多才，中年平凡，晚年隆昌，子孙兴旺。\n12 淇 水：英俊佳人，上下敦睦，二子吉祥，义利分明，成功隆昌，官运旺盛。\n12 清 水：吉凶分明，配合吉则成功隆昌，凶则忌车怕水，中年多灾。\n12 深 水：刑偶伤子，一生清雅荣贵，中年成功隆昌，环境良好。\n12 淞 水：学识渊博，勤俭建业，中年成功隆昌，出国之格，荣贵之字。\n12 淘 水：温和贤淑，良善积德，福禄双收，名利有份，环境良好。\n12 添 水：孤独格，父母无缘，身弱短寿，忌车怕水，晚年吉祥，中年多灾。\n12 涴 水：秀气伶俐，温和贤能，勤俭持家，成功隆昌，环境良好。\n12 无 水：忧心劳神，刑偶伤子，一生困苦潦倒，难得幸福，短寿劳苦。\n12 喜 水：一生清雅荣贵，刑偶欠子，中年成功隆昌，环境良好。\n12 闲 水：忧心劳神，多刑克，一生困苦潦倒，忌车怕水，短寿之字。\n12 现 水：口快性刚，多才伶俐，中年吉祥，晚年隆昌，环境良好。\n12 项 水：一生清雅多才，智勇双全，中年劳苦，晚年吉祥。\n12 涯 水：一生清雅平凡，中年劳或奔波，晚年吉祥。\n12 淹 水：外观幸福，内心多忧，中年劳苦，晚年吉祥。\n12 液 水：口快性刚，事劳无功，中年多灾，晚年吉祥。\n12 淯 水：理智充足，福禄双收，名利有份，成功隆昌，荣贵之字。\n12 渊 水：福寿兴家，理智充足，慈祥有德，环境良好，安享富贵。\n12 云 水：清秀伶俐，多才巧智，出国之格，中年成功隆昌。\n12 粥 水：幼年辛苦，中年吉祥，名利双收，福禄永在，晚年吉祥。\n12 焙 火：多才清闲，一生精明公正，中年吉祥，福禄双收，荣幸之字。\n12 采 火：清秀巧妙，天生聪明，幼年辛苦，成功隆昌，二子吉祥。\n12 场 火：忧心劳神，事劳无功，中年潦倒，晚年吉祥。\n12 程 火：一生清雅荣贵，智勇双全，中年多劳，晚年吉昌。\n12 单 火：福禄双收，多才贤能，中年多灾，晚年吉祥。\n12 登 火：清雅荣贵，多才贤能，中年多劳，成功隆昌，二子吉祥。\n12 短 火：忧心劳神，身弱短寿，中年多灾，晚年吉祥。\n12 惇 火：福禄双收，多才伶俐，中年平凡，晚年吉祥，荣幸之字。\n12 敦 火：出外吉祥，清雅英敏，中年吉祥，晚年隆昌幸福，忌车怕水。\n12 焚 火：有爱情厄，清雅秀气，中年吉祥，晚年隆昌，出外幸福。\n12 接 火：忧心劳神，百事劳苦，中年劳或多灾，晚年吉祥。\n12 晶 火：英俊之才，多相克，中年劳或身弱，晚年吉祥，常人难受。\n12 就 火：清雅多才，环境良好，成功隆昌，出外大吉，女人性刚口快，再嫁之字。\n12 吭 火：清雅荣贵，英俊佳人，中年劳，晚年吉祥，小心爱情厄。\n12 琅 火：口快心直，清雅荣贵，中年劳或多灾，成功隆昌。\n12 劳 火：忧心劳神，多相克，一生多灾，难得幸福，不详多疾，短寿之字。\n12 理 火：清雅荣贵，多才巧智，成功隆昌，女人有不幸之灾。\n12 量 火：温和贤能，享福一生，中年吉祥，晚年隆昌，环境良好。\n12 琉 火：清雅荣贵，多才贤能，中年成功隆昌，出国之格。\n12 硫 火：刑偶欠子，身弱短寿，中年劳或奔波，晚年吉祥。\n12 闰 火：多才巧智，清雅荣贵，中年成功隆昌，环境良好。\n12 探 火：重情失败，刑偶伤子，中年劳，晚年吉祥。\n12 迢 火：出外贵人明现，清雅荣贵，刑偶或伤子，成功隆昌，官运旺。\n12 贴 火：清雅伶俐，多才贤能，中年吉祥，晚年隆昌，环境良好。\n12 婷 火：温和贤淑，口快心直，多才清雅，中年隆昌，一生安详，福寿之字。\n12 痛 火：暗淡无光，身弱短寿，有爱情烦恼，一生难幸福。\n12 欻 火：口快心直，少年艰难，中年劳或奔波，晚年隆昌，官旺之字。\n12 寻 火：忧心劳神，百事劳苦，刑偶欠子，中年多灾，晚年吉祥。5\n12 循 火：小心爱情厄，一生清雅平凡，中年劳，晚年吉祥，出国之字。\n12 巽 火：忧心劳神，忌车怕水，命运多舛，一贫如洗，身弱短寿。\n12 焱 火：通晓大义，克己助人，温和贤能，成功隆昌，但常人难受。\n12 轶 火：忧心劳神或孤独，一生清雅多才，中年吉祥，晚年劳神。\n12 媛 火：秀气伶俐，温和贤能，中年吉祥，晚年隆昌，出外吉祥。\n12 哲 火：福禄双收，中年劳，成功隆昌，晚年吉祥。\n12 诊 火：有才能理智，兄弟无靠，中年吉祥，晚年劳神。\n12 轸 火：勤俭得禄，克振门户，中年成功隆昌，环境良好。\n12 证 火：义利分明，言而必信，操守廉正，中年成功隆昌，荣贵之字。\n12 智 火：吉凶分明，吉则成功隆昌，官运旺，荣贵，凶则忌车怕水，短寿不幸。\n12 轴 火：出外逢贵得才，福禄双收，中年劳，晚年吉祥，双妻之格。\n12 堡 土：一生清雅伶俐，福禄双收，忌车怕水，多疾病，晚年吉祥。\n12 堤 土：多才巧智，清雅荣贵，出国之字，中年成功隆昌。\n12 奠 土：一生清雅，出外吉祥，中年劳，晚年吉祥，多才，二子吉祥。\n12 恶 土：忧心劳神，欠子之字，中年吉祥，晚年劳神。\n12 费 土：一生清雅多才，二子吉祥，中年劳，晚年吉祥。\n12 黑 土：性刚果断，英雄性格，杀人被杀，有牢狱之灾，难得幸福。\n12 黄 土：一生清雅，聪明伶俐，刑克父母，中年劳，晚年吉祥。\n12 堪 土：清雅伶俐，刑偶伤子，中年吉祥，环境良好，晚年劳神。\n12 岚 土：刑克父母，清雅荣贵，才智出众，身劳短寿，欠子之字。\n12 蛙 土：得天时地利，天赐之福，中年吉祥，晚年劳神，小心爱情厄。\n12 为 土：英敏秀气，清雅伶俐，中年劳或潦倒，晚年吉祥。\n12 围 土：福祉绵远，荣贵多才，中年劳或奔波，晚年吉祥。\n12 惟 土：温和贤能，多才伶俐，中年劳神，晚年吉昌。\n12 翕 土：精明公正，克己助人，清雅温和，中年平凡，晚年吉祥。\n12 翔 土：清雅荣贵，官运旺，中年成功隆昌，出国之字，富贵之命。\n12 砚 土：一生清雅伶俐，福禄双收，刑偶伤子，晚年吉祥。\n12 堰 土：刑偶伤子，晚婚或迟得子吉，中年劳或奔波，晚年吉祥。\n12 壹 土：清雅荣贵，精明公正，中年吉祥，晚年隆昌，二子吉祥。\n12 贻 土：一生安稳守己，福禄双收，中年吉祥，晚年隆昌，环境良好。\n12 越 土：出外吉祥，智勇双全，成功隆昌，女人多灾，身弱不幸。\n13 钵 金：一生安详快乐，中年平凡，晚年吉祥，环境良好。\n13 琛 金：清雅荣贵，多才有能，中年成功隆昌，晚年吉祥，福寿之字。\n13 絺 金：性刚多才，中年劳，晚年吉祥，女人有爱情厄，再嫁守寡之字。\n13 饬 金：多相克之字，一生清雅平凡，中年劳苦，晚年吉祥。\n13 愁 金：不祥之字，身弱短寿，一生多灾，难得幸福，劳神困苦之字。\n13 酬 金：刑偶伤子，清雅多才，福禄双收，中年劳，晚年吉祥。\n13 楚 金：一生清雅，智勇双全，中年吉祥隆昌，晚年劳神，出国之格。\n13 琮 金：智勇双全，名利双收，英俊荣贵，中年吉祥，晚年隆昌，官运旺。\n13 催 金：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n13 钿 金：安富尊荣，多才伶俐，中年成功隆昌，环境良好，富贵之字。\n13 暑 金：晚婚迟得子大吉，清雅多才，中年劳，晚年吉祥。\n13 鼠 金：不祥多灾，身弱短寿，难幸福，多灾难。\n13 蜀 金：精明公正，克己助人，出外吉祥，中年成功隆昌，出国之字。\n13 剿 金：带刀厄，武官大吉，杀人被杀，或有牢狱之灾，恶死凶亡之字。\n13 捷 金：奔波劳苦，出国之格，中年成功隆昌，忌车怕水，环境良好。\n13 靖 金：学识渊博，才智出众，中年成功隆昌，官运旺盛之字。\n13 钜 金：精明公正，义利分明，官运旺，出国之字，成功隆昌。\n13 铃 金：清雅荣贵，天生聪颖，中年平凡，晚年吉祥，幸福之字。\n13 铅 金：奔波劳苦，身弱多病，有才无运，中年劳，晚年吉祥。\n13 裟 金：出外逢贵得财，秀气巧妙，中年吉祥，晚年劳神。\n13 伤 金：忧心劳神，事劳无功，身弱短寿，一生多灾。\n13 蜃 金：勤俭持家，中年虽劳，吉祥荣昌，子孙兴旺。\n13 诗 金：多才贤能，理智充足，官运旺，中年成功隆昌，出国之字。\n13 狮 金：性刚口快，双妻之格，中年劳或奔波，晚年吉祥。\n13 势 金：刑克父母，清雅多才，中年劳或奔波，晚年吉祥。\n13 试 金：忧心劳神，事劳无功，重情失败，中年多劳，晚年吉祥。\n13 轼 金：忧心劳神，事劳无功，中年劳，晚年吉祥，荣幸之字。\n13 嗣 金：智勇双全，精明公正，中年成功隆昌，官运旺，昌荣之字。\n13 肆 金：身弱短寿，刑偶伤子，中年劳苦，晚年隆昌。\n13 送 金：吉凶分明，吉则成功隆昌，清雅荣贵，凶则一贫如洗，忌车怕水。\n13 肃 金：有爱情烦恼，忌车怕水，身弱短寿，中年多灾，晚年吉祥。\n13 岁 金：清雅多才，英敏贤能，中年平凡，晚年吉祥。\n13 详 金：温和贤能，福寿兴家，中年平凡，晚年隆昌。\n13 想 金：有爱情烦恼，内心多忧，中年劳，晚年吉祥，保守之字。\n13 新 金：多才巧智，智勇双全，一生中年多灾，晚年吉祥，名利之字。\n13 歆 金：刑偶欠子，身弱多病，中年多劳，晚年吉祥。\n13 绣 金：小心爱情厄，清雅秀气，配合吉则出国隆昌，凶则不幸多灾。\n13 暄 金：智勇双全，清雅荣贵，家声克振，成功隆昌，官旺之字。\n13 驯 金：一生清雅，奔波劳苦，中年吉祥，晚年隆昌，刑偶伤子。\n13 询 金：有爱情厄，刑偶伤子，中年吉祥，晚年劳神多病。\n13 愉 金：一生清雅荣贵，谋为出众，官运旺，财弱，享福终世。\n13 钰 金：清秀伶俐，有才能理智，官旺，中年吉祥，晚年隆昌。\n13 裕 金：出外吉祥，福禄双收，中年吉祥，刑偶伤子，晚年劳神。\n13 愈 金：理智充足，智勇双全，中年多劳，晚年吉祥。\n13 载 金：子孙兴旺，清雅伶俐，多才荣贵，中年成功隆昌，出国之字。\n13 债 金：二子吉祥，清雅多才，中年肯做肯劳，成功吉祥，子孙兴旺。\n13 斟 金：口快心直，环境良好，刑偶欠子，中年吉祥，晚年劳神。\n13 钲 金：智勇双全，精明公正，清雅荣贵，中年成功隆昌。\n13 庄 金：秀气巧妙，一生清雅伶俐，中年成功隆昌，晚年子孙鼎盛。\n13 装 金：出外吉祥，刑偶伤子，晚婚吉，中年劳，晚年隆昌。\n13 资 金：清雅荣贵，二子吉祥，中年隆昌，多才贤能，环境良好，秀气之字。\n13 椿 木：清雅秀气，精诚待人，中年平，晚年隆昌，女人有爱情厄。\n13 琳 木：学识丰富，温和贤能，克己助人，出国荣达。\n13 娩 木：秀气巧妙，清雅伶俐，晚婚吉祥，荣幸之字。\n13 竖 木：清雅荣贵，中年成功隆昌，出国之格，多才贤能，官旺之字。\n13 枫 木：精明公正，一生多福，福禄丰厚，中年吉祥隆昌，小心爱情厄。\n13 感 木：忧心劳神，身弱短寿，中年多灾，晚年吉祥，重感情之字。\n13 跪 木：忧心劳神，一生难幸福，多灾难，中年潦倒，晚年享福。\n13 畸 木：有爱情厄，多才贤能，中年小心，晚年隆昌，福禄双收。\n13 楫 木：智勇双全，义利分明，官或财旺，中年平凡，晚年吉祥。\n13 嫁 木：外观幸福，内心多忧，出外吉祥，晚年隆昌，忌车怕水。\n13 减 木：克父命，刑偶伤子，出外吉祥，中年吉祥，晚年劳神。\n13 毽 木：多才巧智，清雅伶俐，中年劳或奔波，晚年吉祥。\n13 郊 木：有爱情厄，身弱短寿，中年劳，晚年吉祥。\n13 揭 木：幼年多灾，中年吉祥隆昌，忌车怕水，有破相之灾。\n13 解 木：一生清雅，理智充足，中年多劳，晚年吉祥。\n13 禁 木：刑偶伤子，忌车怕水，或有爱情厄，中年小心，晚年吉祥。\n13 靳 木：勤俭建业，福禄双收，智勇双全，中年成功隆昌，环境良好。\n13 经 木：晚婚迟得子吉，英俊隆昌，女人多灾。\n13 睛 木：清雅荣贵，一门鼎盛，成功隆昌，女人小心爱情厄。\n13 敬 木：清雅荣贵，出外大吉，福禄双收，名利永在，出国之字。\n13 舅 木：意志薄弱，虽成功隆昌，多刑克，中年多灾，晚年劳神。\n13 绢 木：身弱多病，有爱厄，中年劳，晚年吉祥，忌车怕水，欠子之字。\n13 慨 木：多才贤能，出外吉祥，刑偶伤子，中年隆昌，晚年劳神。\n13 楷 木：晚婚迟得子吉，出外吉祥，中年劳或奔波，晚年隆昌。\n13 窟 木：不祥之字，难成功，多灾难，病弱短寿，一生劳苦。\n13 夸 木：多愁少乐，口才伶俐，中年勤敏，但有祸端，晚年吉祥。\n13 暌 木：刑偶伤子，晚婚吉祥，中年劳或奔波，晚年吉祥，官旺之字。\n13 琨 木：清雅多才，英俊勤俭，中年吉祥，晚年隆昌，官旺之字。\n13 莨 木：出外吉祥，天生聪颖，中年吉祥，晚年隆昌，幸福之字。\n13 莉 木：秀气巧妙，多才巧智，中年成功隆昌，出国之字，荣贵吉祥。\n13 廉 木：清雅英敏，出外吉祥，中年平凡，晚年吉祥，环境良好。\n13 楣 木：秀气贤能，一生福禄，荣贵隆昌，环境良好，晚年劳神。\n13 募 木：带刀厄，刑偶伤子，有爱情烦恼，中年劳神，晚年吉祥。\n13 楠 木：刑偶或伤子，多才巧智，中年劳，晚年吉祥，女人刑夫，环境良好。\n13 莆 木：智勇双全，机谋多才，小心爱情厄，中年有灾，晚年吉祥。\n13 琦 木：有爱情厄，身弱短寿，福禄双收，中年吉祥，晚年劳神。\n13 琪 木：智勇双全，清雅荣贵，官运旺，中年成功隆昌，清秀之字。\n13 祺 木：英俊多才，清雅荣贵，中年吉祥，环境良好，官运旺。\n13 琴 木：命硬克父，少年艰难，中年奔波劳苦，晚年吉庆，女人薄幸。\n13 勤 木：刑克父母，刑偶伤子，孤独劳神，身弱短寿，多灾之字。\n13 倾 木：天生聪颖，多才秀气，清雅荣贵，二子吉祥，出国之字。\n13 裙 木：刑偶伤子，身弱多病，清雅平凡，中年劳，晚年吉祥。\n13 群 木：多才贤能，慈祥有德，中年吉祥，晚年隆昌，福禄之字。\n13 莎 木：温和伶俐，勤俭多才，中年吉祥，晚年隆昌，荣贵之字。\n13 颂 木：学问丰富，官运旺盛，中年成功隆昌，二子吉祥，忌车怕水。\n13 莞 木：清秀巧妙，清雅温和，中年成功隆昌，出国之字，有爱情厄。\n13 斡 木：多才贤能，温和伶俐，技术方面大吉，成功隆昌，环境良好。\n13 暇 木：多忧少乐，身弱短寿，中年劳苦，晚年吉祥，福禄之字。\n13 靴 木：忧心劳神，事劳无功，一生多灾，病弱短寿。\n13 筵 木：智勇双全，出外吉祥，清雅荣贵，官运旺，成功隆昌，环境良好。\n13 杨 木：一生清雅温和，多才贤能，中年劳苦，晚年隆昌。\n13 椰 木：性刚果断，刑偶伤子，中年劳或潦倒，晚年吉祥。\n13 业 木：多才勤俭，清雅伶俐，中年吉祥，出国之格，晚年隆昌，双妻之格。\n13 义 木：多才巧智，清雅伶俐，中年吉祥，晚年隆昌，幸福之字。\n13 莠 木：一生清雅伶俐，多才巧智，刑偶欠子，晚年吉祥。\n13 愚 木：一生难幸福，百事劳苦，中年多灾，晚年吉祥。\n13 榆 木：清雅容贵，有胆有识，官运旺，中年成功隆昌，福寿兴家。\n13 预 木：英雄格，清雅多才，中年吉祥，晚年隆昌，出国之字。\n13 御 木：秀气伶俐，理智充足，贵人明现，常人难受，武官吉。\n13 颁 水：带刀厄，智勇双全，一生多才贤能，中年有灾，晚年隆昌。\n13 斑 水：一生清雅多才，怀才不遇，中年多灾，晚年吉祥。\n13 雹 水：忧心劳神，身弱短寿，一生困苦，难得幸福。\n13 陂 水：晚婚吉庆，早婚不利，一生多灾，难幸福，晚年吉祥。\n13 补 水：贵人明现，清雅伶俐，中年多灾，晚年吉祥，子孙兴旺。\n13 测 水：宽宏雅量，上下敦睦，中年平凡，晚年吉昌，环境良好。\n13 渡 水：出外逢贵得财，中年奔波劳苦，夫妻和合欠子，晚年隆昌。\n13 琶 水：温和贤淑，勤俭兴家，福禄双收，中年吉祥，晚年隆昌。\n13 饭 水：不祥之字，事劳无功，中年多灾，晚年享福。\n13 蜂 水：清雅伶俐，多才贤能，中年肯做肯劳，晚年吉祥。\n13 港 水：少年艰难，多才贤能，中年劳苦或奔波，晚年隆昌，双妻之格。\n13 号 水：性刚果断，智勇双全，中年吉祥，晚年劳神。\n13 湖 水：英俊多才，一生平凡，保守之字，中年吉祥，晚年劳神，妻贤子贵。\n13 换 水：刑偶伤子，多才贤能，成功隆昌，女人薄幸，守寡之字。\n13 惶 水：天生聪颖，离祖吉祥，官运旺，中年劳，晚年吉祥。\n13 挥 水：精明公正，多才英明，中年成功隆昌，子孙兴旺。\n13 晖 水：命硬，清雅荣贵，官旺，中年平凡，晚年隆昌，环境良好。\n13 会 水：晚婚迟见子吉，一生清雅平凡，中年吉祥，晚年劳神。\n13 浑 水：英俊多才，清雅荣贵，中年成功隆昌，晚年环境良好，出国之格。\n13 湫 水：虚荣心强，有爱情厄，中年多灾，晚年吉祥，贤能之字。\n13 较 水：奔波劳苦，损丁破财，中年忌车怕水，成功隆昌，环境良好。\n13 粳 水：忧心劳神，克父欠子，中年劳苦，晚年吉祥隆昌，子孙兴旺。\n13 鸠 水：忧心劳神，病弱短寿，中年劳但吉祥，晚年隆昌。\n13 雷 水：一生清雅，多才贤能，刑偶伤子，中年平凡，晚年隆昌。\n13 妈 水：福禄双收，多才温和，中年吉祥，环境良好，晚年劳神。\n13 盟 水：智勇双全，有才能理智，刑偶欠子，晚年吉祥。\n13 琵 水：二子吉祥，清雅多才，中年吉祥，晚年隆昌。\n13 聘 水：有爱情烦恼，多忧少乐，中年劳，晚年吉祥但多病。\n13 瓶 水：不祥之字，暗淡无光，多灾难，晚年吉祥。\n13 绥 水：秀气伶俐，小心爱情厄，中年吉祥，晚年隆昌，环境良好。\n13 汤 水：智勇双全，义利分明，官或财旺，中年成功隆昌，出国之字。\n13 湍 水：胆识丰富，清雅荣贵，中年成功隆昌，环境良好，出国之字。\n13 微 水：有爱情厄，出外吉祥，中年劳，晚年吉祥。\n13 渭 水：一生清雅伶俐，天生聪明，中年成功隆昌，女人助夫兴家。\n13 熙 水：破相，身弱短寿，清雅多才，中年成功隆昌，晚年安详。\n13 湘 水：精明公正，清雅荣贵，中年成功隆昌，女人有爱情厄，欠子之字。\n13 溆 水：天生聪明，多才巧智，中年成功隆昌，荣华富贵，出国之字。\n13 游 水：一生清雅伶俐，名利双收，中年劳，晚年吉祥，乐天之字。\n13 渝 水：胆识兼有，清雅荣贵，官运旺，中年成功隆昌，精诚之字。\n13 郁 水：清雅伶俐，口快心直，中年成功隆昌，晚年昌盛安稳。\n13 浈 水：多才巧智，清雅荣贵，中年成功隆昌，环境良好，二子吉祥。\n13 稗 火：破相，少年艰难，环境良好，晚年吉祥。\n13 驰 火：奔波劳苦，潦倒一生，中年多灾，晚年隆昌。\n13 传 火：一生多才平凡，出外吉祥，中年平凡，晚年吉祥。\n13 亶 火：一生清雅荣贵，学识渊博，官运旺，中年成功隆昌。\n13 当 火：性刚，刑偶伤子，晚婚大吉，中年小心有灾，晚年隆昌，环境良好。\n13 电 火：外祥内苦，一生伶俐，刑偶伤子，中年劳，晚年吉祥。\n13 殿 火：英雄豪爽，义利分明，中年成功隆昌，清雅荣贵，出国之字。\n13 鼎 火：精明公正，智勇双全，官运旺，成功隆昌，出国荣贵。\n13 督 火：忧心劳神，一贫如洗，多灾难，难幸福，一生困苦。\n13 顿 火：刑偶伤子，身弱短寿，二子吉祥，中年吉祥，晚年劳神。\n13 焕 火：理智充足，多才伶俐，出外吉祥，荣贵隆昌，女人多灾或不幸。\n13 煌 火：刑偶欠子，多才贤能，身瘦清雅，中年平，晚年吉祥。\n13 晃 火：出外逢贵得财，智勇双全，官运旺，中年成功隆昌，出国之字。\n13 迹 火：忧心劳神，损丁破财，中年多劳，晚年吉祥但多灾。\n13 煎 火：多愁多忧，刑偶欠子，中年劳或奔波，晚年吉祥，老来得荣。\n13 廊 火：性刚果断，多相克，中年多劳，晚年吉祥。\n13 炼 火：清雅伶俐，多才巧智，出外大吉，中年平，晚年隆昌。\n13 零 火：有才能理智，清雅荣贵，中年吉祥，晚年隆昌，子孙兴旺。\n13 禄 火：理智充足，刑克父母，一生清雅荣贵，福禄双收，中年平凡，晚年隆昌。\n13 路 火：清雅秀气，福禄双收，身弱多病，忌车怕水，晚年吉祥。\n13 煤 火：有才能理智但无运，中年劳苦或潦倒，晚年吉祥。\n13 睦 火：智勇双全，精明公正，温和贤能，官运旺，一生享福。\n13 乃 火：刑偶伤子，多才巧智，清雅荣贵，中年成功，晚年劳神。\n13 农 火：一生温和贤能，智勇双全，中年劳，晚年吉祥，精诚之字。\n13 暖 火：晚婚或迟得子大吉，秀气多才，出外隆昌，中年吉祥。\n13 稔 火：一生清雅荣贵，中年吉祥，晚年隆昌，环境良好。\n13 塔 火：克妻伤子，忧心劳神，福禄双收，中年离乱，晚年吉祥。\n13 艇 火：奔波劳苦，智勇双全，吉凶参半，中年劳，晚年吉祥。\n13 退 火：奔波劳苦，一贫如洗，中年潦倒，短寿之字。\n13 脱 火：奔波劳苦，身弱多病，中年劳苦，晚年吉祥。\n13 炜 火：多才贤能，清雅荣贵，中年成功隆昌，出国之格。\n13 煊 火：清雅多才，贤能精诚，官运旺，中年有灾，晚年隆昌，出国之字。\n13 烟 火：清雅伶俐，多才巧智，中年有灾，晚年吉祥。\n13 琰 火：性刚果断，一生清雅多才，中年吉祥隆昌，晚年劳神。\n13 扬 火：智勇双全，多才贤能，名利双收，荣贵出国，富贵之字。\n13 炀 火：性刚口快，一生清雅，刑偶欠子，官旺，短寿之字。\n13 虞 火：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n13 煜 火：一生清雅荣贵，勤敏多才，中年成功隆昌，出国之字，忌车怕水。\n13 詹 火：英敏多才，清雅贤能，福禄双收，武官吉，女人薄幸。\n13 照 火：胆识丰富，多才荣贵，官运旺，中年有灾，晚年隆昌。\n13 雉 火：一生清雅荣贵，理智充足，中年吉祥，晚年劳神。\n13 追 火：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n13 琢 火：出外逢贵得财，智勇双全，中年成功隆昌，环境良好。\n13 阿 土：下贱之字，忧心劳神，身弱多病，中年劳，晚年吉祥。\n13 矮 土：忧心劳神，事劳无功，一生多灾，身弱短寿，不雅之字。\n13 爱 土：多才伶俐，出外吉祥，中年劳，晚年吉祥，清雅之字。\n13 暗 土：不祥之字，暗淡无光，身弱短寿，不幸多灾，一生贫困。\n13 奥 土：二子吉祥，多才贤能，中年吉祥，晚年劳神。\n13 碑 土：破相则中年成功隆昌，无破相则中年劳苦，晚年吉祥，平凡之字。\n13 话 土：口快心直，多才贤能，福禄双收，中年劳，晚年隆昌。\n13 块 土：多忧少乐，事劳无功，中年多灾，晚年吉祥。\n13 圣 土：学问丰富，清雅荣贵，官运旺盛，成功隆昌，享福终世之字。\n13 琬 土：一生多福，清雅荣贵，中年成功隆昌，出国之字，荣贵之字。\n13 碗 土：温和贤能，智勇双全，中年平凡，晚年吉祥，出国之字。\n13 温 土：一生清雅多才，刑偶伤子，中年吉祥，晚年劳神。\n13 握 土：忧心劳神，事劳无功，中年吉祥，晚年劳神。\n13 勋 土：刑偶伤子，晚婚吉祥，中年吉祥，晚年隆昌，环境良好。\n13 衙 土：有才能理智，清雅荣贵，中年成功隆昌，出国之字。\n13 爷 土：温和慈祥，有成人之美德，中年吉祥，晚年劳神。\n13 意 土：外观幸福，内心多忧，刑偶伤子，中年劳，晚年隆昌。\n13 裔 土：刑克父母，官运旺，中年劳，晚年隆昌，荣贵之字。\n13 饮 土：刑偶欠子，命途多舛，难得幸福，短寿之字。\n13 佣 土：刑偶欠子，清雅荣贵，克己助人，名利双收，贤能多才，晚年多疾。\n13 雍 土：性刚果断，智勇双全，中年成功隆昌，晚年劳神，忌车怕水。\n13 犹 土：多才荣贵，英雄豪爽，中年吉祥，晚年隆昌。\n13 园 土：清雅荣贵，有文士之风，财官两旺，中年成功隆昌，富贵享福。\n13 圆 土：秀气贤淑，少年艰难，中年吉祥，荣贵幸福。\n13 稚 土：智勇双全，清雅荣贵，福禄丰厚，名利双收，幸福之字。\n14 察 金：二子吉祥，清雅多才，一生平凡，晚年隆昌，保守之字。\n14 玚 金：刑克父母，刑偶伤子，中年奔波，晚年吉祥发达。\n14 称 金：一生清荣多才，中年多劳，晚年吉祥，但劳神之字。\n14 诚 金：精明公正，智勇双全，名利双收，中年成功隆昌，晚年劳神。\n14 绸 金：清雅秀气，多才贤能，小心爱情厄，中年吉祥，晚年劳神。\n14 慈 金：温和贤能，多才秀气，中年吉祥，晚年隆昌但劳神。\n14 粹 金：有爱情烦恼，事劳无功，中年多灾，晚年吉祥。\n14 翠 金：小心爱情厄，清秀温和，中年多劳，晚年隆昌，幸福之字。\n14 阀 金：性刚果断，意气用事，杀人被杀，有牢狱之灾，短寿之字。\n14 署 金：忧心劳神，刑偶伤子，中年劳，晚年吉祥，子孙兴旺。\n14 划 金：多忧少乐，晚婚大吉，中年劳，晚年吉祥。\n14 精 金：胆识丰富，官或财旺，一生荣贵隆昌，环境良好，女人刑夫。\n14 聚 金：忧心劳神，事劳无功，一生多灾，晚年吉祥。\n14 铭 金：智勇双全，精明公正，福禄双收，名利有份，安享尊荣之字。\n14 齐 金：清雅多才，学识渊博，中年吉祥，晚年劳神。\n14 綮 金：清雅荣贵，多才贤能，中年成功隆昌，有爱情厄。\n14 铨 金：精明公正，身瘦多才，清雅荣贵，中年成功隆昌，环境良好。\n14 认 金：忧心劳神，病弱短寿，一生多灾，有爱情厄，晚年吉祥。\n14 瑞 金：英俊才人，多才荣贵，教育界大吉，成功隆昌，女人身瘦多厄。\n14 僧 金：温和伶俐，一生清雅多才，中年吉祥，晚年隆昌。\n14 韶 金：带刀厄，刑偶伤子，福禄双收，中年吉祥，晚年隆昌。\n14 慎 金：福禄双收，智能非凡，二子吉祥，中年平，晚年隆昌。\n14 誓 金：福禄双收，口快伤人，杀人被杀，有牢狱之灾，女人再嫁。\n14 寿 金：环境良好，财官两旺，身弱多病，晚年劳神。\n14 绶 金：忧心劳神，一生勤俭温和，中年劳，晚年吉祥，短寿之字。\n14 说 金：出外吉祥，智勇双全，中年吉祥，环境良好，女人多灾，薄幸之字。\n14 诵 金：一生清雅伶俐，秀气多才，中年平，晚年吉祥。\n14 速 金：出外吉祥，一生多才清雅，中年劳，晚年吉祥，小心爱情厄。\n14 酸 金：清雅多才，勤俭贤能，中年吉祥，出外大吉，女人薄幸。\n14 铜 金：多才温和，晚婚迟得子吉，福禄双收，名利有份，环境良好，女人短寿。\n14 僖 金：多才温和，刑偶伤子，福禄双收，中年隆昌，环境良好，短寿之字。\n14 衔 金：精明公正，操守廉正，中年成功隆昌，名利双收，富贵之字。\n14 线 金：一生清雅多才，良善积德，忠厚温和，中年吉祥，女人身弱短寿。\n14 像 金：性刚口快，慷慨待人，中年劳或奔波，晚年吉祥，双妻之格。\n14 需 金：清雅荣贵，多才贤能，中年吉祥，晚年隆昌，环境良好。\n14 银 金：刑偶伤子，清雅多才，英雄豪杰，环境良好，女人有爱情厄。\n14 瑜 金：学识渊博，官运旺，清雅荣贵，成功隆昌，名利双收，出国之字。\n14 造 金：出外吉祥，清雅多才，中年吉祥，晚年隆昌，福禄双收。\n14 甄 金：秀气清雅，出外吉祥，中年平凡，晚年吉祥，环境良好。\n14 赈 金：刑偶伤子，天生聪颖，中年多灾，晚年吉祥幸福。\n14 帚 金：不祥之字，暗淡无光，一生潦倒，病弱短寿。\n14 综 金：英敏之才，天生聪颖，中年成功隆昌，晚年劳神之字。\n14 粽 金：勤俭治家，忠厚善良，中年劳，晚年吉祥，环境良好。\n14 榜 木：多才巧智，清雅荣贵，成功隆昌，环境良好，子孙兴旺。\n14 菜 木：秀气伶俐，清雅多才，身瘦温和，中年劳，晚年隆昌，荣幸之字。\n14 尝 木：一生荣幸，所谋如意，贵人明现，小心爱情厄，晚年隆昌。\n14 纲 木：口快心直，多才巧智，武职吉，中年劳，晚年隆昌，女人有爱情厄。\n14 诰 木：智勇双全，禄享千钟，中年吉祥，晚年隆昌，官旺之字。\n14 歌 木：出外吉祥，一生清雅，刑偶伤子，中年劳，晚年吉祥。\n14 构 木：清雅多才，义利分明，中年多劳，晚年吉祥，环境良好。\n14 鼓 木：忧心劳神，事劳无功，中年多灾，晚年隆昌。\n14 管 木：多才贤能，清雅温和，福禄双收，忌车怕水，中年劳，晚年吉祥。\n14 赫 木：命硬多相克，身弱多病，中年劳，晚年吉祥。\n14 槐 木：忧心劳神，事劳无功，怀才不遇，中年劳，晚年吉祥。\n14 箕 木：英敏佳人，贵人明现，二子吉祥，中年劳，晚年隆昌。\n14 嘉 木：清雅荣贵，成功隆昌，晚婚大吉，多才温和，出国之格。\n14 笺 木：外祥内苦，身弱多病，中年劳，晚年吉祥，短寿之字。\n14 降 木：忧心劳神，出外吉祥，中年多劳，晚年隆昌。\n14 侥 木：勤俭治家，家声克振，重义信用，福禄双收，刑偶出外之字。\n14 诫 木：忧心劳神，事劳无功，中年多灾，晚年吉祥，小心牢狱之灾。\n14 紧 木：忧心劳神，事劳无功，中年多灾，身弱短寿。\n14 菁 木：温和贤淑，秀气多才，中年吉祥，晚年劳神，有爱情厄。\n14 兢 木：破相或身弱多病，刑偶伤子，不幸多灾，一生难幸福。\n14 菊 木：小心爱情烦恼，清秀伶俐，多才荣贵，中年吉祥，晚年隆昌。\n14 郡 木：一生出外吉祥，奔波劳苦，中年多劳，晚年吉祥隆昌。\n14 犒 木：性刚果断，刑偶伤子，福禄双收，欠仁和，晚年吉祥。\n14 魁 木：智勇双全，清雅荣贵，中年吉祥，晚年隆昌，福寿兴家。\n14 榔 木：性刚果断，刑偶伤子，中年多灾，晚年吉祥。\n14 菱 木：出外逢贵得财，中年吉祥，晚年隆昌，贤能多才，老来劳神。\n14 榴 木：学识丰富，多才贤能，出国之格，成功隆昌，环境良好。\n14 萌 木：幼年辛苦，英雄之格，忌车怕水，中年小心，晚年吉祥。\n14 幕 木：忧心劳神，事劳无功，中年潦倒，晚年吉祥。\n14 裴 木：出外吉祥，忧心劳神，怀才不遇，中年劳，晚年吉祥。\n14 旗 木：性刚口快，一生多灾，中年多劳，奔波潦倒，晚年劳神。\n14 綦 木：性刚果断，有凶死之兆，或破相牢狱之灾，中年劳，晚年吉祥。\n14 绮 木：温和贤淑，秀气多才，有爱情厄，中年平，晚年吉祥，福禄之字。\n14 枪 木：智勇双全，福禄双收，中年吉祥，晚年隆昌，双妻之格。\n14 侨 木：刑偶伤子，一生清雅荣贵，中年吉祥，晚年劳神。\n14 轻 木：忧心劳神，事劳无功，怀才不遇，身弱短寿，忌车怕水。\n14 荣 木：吉凶分明，吉则清雅荣贵，成功隆昌，凶则杀人被杀，有牢狱之灾，恶死凶亡。\n14 榕 木：福禄双收，天生聪颖，荣贵贤能，中年成功隆昌，出国之格。\n14 瑟 木：理智充足，清雅秀气，中年平凡，晚年隆昌，子孙兴旺。\n14 菘 木：清雅荣贵，操守廉正，官运旺，出国之字，成功享福。\n14 算 木：幼年艰难，刑偶欠子，清雅多才，中年劳，晚年吉祥。\n14 菀 木：清雅伶俐，多才贤能，勤俭建业，名利双收，荣幸之字。\n14 伪 木：忧心劳神，事劳无功，中年多灾，晚年吉祥，有才无运。\n14 榭 木：学识渊博，财官两旺，荣贵隆昌，环境良好。\n14 疑 木：暗淡无光，命途多舛，一生多灾，短寿自杀。\n14 语 木：有爱情厄，清雅多才，福禄双收，中年吉祥，环境良好。\n14 愿 木：忧心劳神，一生清雅多才，小心爱情厄，中年劳，晚年吉祥。\n14 肇 木：精明公正，忠厚多才，清雅荣贵，官运旺，成功隆昌，名利双收。\n14 饱 水：重信用，勤俭治家，中年劳或奔波，晚年吉祥。\n14 鼻 水：不祥之字，刑偶伤子，有爱情烦恼，短寿多灾，晚年吉祥。\n14 币 水：不祥之字，多灾难，一贫如洗，病弱短寿。\n14 碧 水：一生清荣，中年成功隆昌，环境良好，双妻之格，女人多病，短寿之格。\n14 宾 水：克父命，智勇双全，义利分明，中年吉祥，晚年隆昌，二子吉祥。\n14 沧 水：身瘦多才，清雅伶俐，中年多灾，晚年享福。\n14 涤 水：温和贤淑，清雅荣贵，官运旺，环境良好，出国之字。\n14 滇 水：温和贤淑，勤俭兴家，二子吉祥，出国之字，成功隆昌。\n14 蜜 水：环境良好，温和多才，有爱情厄，中年平，晚年隆昌。\n14 绵 水：一生清雅荣贵，多才贤能，环境良好，女人秀气贤淑，忌水厄。\n14 熊 水：胆识丰富，智勇双全，中年吉祥，晚年隆昌，荣贵之字。\n14 逢 水：贵人明显，出外吉祥，中年吉祥，晚年隆昌，荣贵之字。\n14 凤 水：学问丰富，官运旺，成功隆昌，富贵之字，女人有爱情厄，薄幸之字。\n14 孵 水：忧心劳神，外祥内苦，中年肯做肯劳，晚年吉祥。\n14 福 水：一生清雅多才，福禄双收，双妻之格，中年吉祥，环境良好。\n14 辅 水：胆识丰富，一生清雅荣贵，官运旺，成功隆昌，荣幸之字。\n14 滏 水：多才重情，慷慨精诚，中年吉祥，晚年隆昌，官旺之字。\n14 阁 水：勤俭治家，忠厚善良，上下敦睦，中年吉祥，环境良好。\n14 嘏 水：秀气伶俐，上下敦睦，福禄双收，中年吉祥，出外大吉，环境良好。\n14 寡 水：不祥之字，带刀厄，暗淡多灾，命途多舛，一贫如洗，病弱短寿。\n14 滚 水：忧心劳神，出外吉祥，中年多灾，晚年吉祥。\n14 豪 水：孤独格，兄弟无靠，出外吉祥，福禄双全，环境良好，幸福之字。\n14 瑚 水：一生清雅伶俐，智勇双全，福禄双收，一生安详，幸福之字。\n14 华 水：天生聪颖，多才贤能，忌车怕水，有爱情厄，中年有灾，晚年吉祥。\n14 滑 水：忧心劳神，事劳无功，中年多灾，晚年享福。\n14 诲 水：勤俭贤能，口才伶俐，中年吉祥，重情失败，晚年隆昌。\n14 魂 水：不祥之字，多灾难，病弱短寿，中年困苦，晚年劳神。\n14 溜 水：多才贤能，福禄双收，名利俱全，中年隆昌，晚年劳神。\n14 髦 水：忧心劳神，事劳无功，中年多灾，晚年劳神。\n14 灭 水：不祥之字，刑克父母，潦倒一生，短寿多灾。\n14 闽 水：忧心劳神，刑偶伤子，中年多劳，晚年吉祥，幼年多灾。\n14 鸣 水：清雅伶俐，秀气温和，中年吉祥，晚年隆昌，福禄之字。\n14 冥 水：子孙兴旺，刑克父母，中年多灾，晚年吉祥，但有不幸之灾。\n14 陌 水：才识卓越，气度恢弘，清雅荣贵，成功隆昌，享福终世。\n14 萍 水：清雅秀气，多才贤能，中年吉祥，小心为爱情失身，成功出国之字。\n14 仆 水：理智充足，多才贤能，清雅荣贵，成功隆昌。\n14 溥 水：义利分明，操守廉正，勤俭温和，中年成功隆昌，出国之字。\n14 溶 水：清雅秀气，福禄双收，名利分明，中年成功隆昌，享福之字。\n14 飒 水：清雅伶俐，温和贤淑，中年吉祥，晚年隆昌，出国之字，小心爱情厄。\n14 饲 水：一生清雅多才，勤俭伶俐，小心爱情厄，中年劳，晚年吉祥。\n14 溲 水：忧心劳神，事劳无功，身弱短寿，晚年享福。\n14 网 水：有爱情烦恼或失身多厄，刑偶伤子，再嫁守寡。\n14 闻 水：有爱情厄，清雅伶俐，晚婚大吉，欠子之字，晚年隆昌。\n14 舞 水：多才巧智，秀气伶俐，中年多劳，晚年吉祥，环境良好，刑偶伤子。\n14 溪 水：事业如意，中年成功隆昌，福禄双收，双妻之命，晚年劳神。\n14 熏 水：天生聪颖，名利双收，秀气多才，中年隆昌，荣贵之字。\n14 溢 水：兄弟无缘，多才贤能，身弱多病，中年吉祥，晚年劳神。\n14 源 水：清雅荣贵，智勇双全，财官两旺，一门兴旺，富贵之字。\n14 滋 水：温和贤淑，清秀伶俐，中年吉祥，晚年隆昌，环境良好，贤能之字。\n14 畅 火：一生清雅荣贵，天生聪颖，事业如意，环境良好。\n14 尘 火：精明公正，义利分明，中年吉祥，晚年隆昌，环境良好。\n14 绰 火：一生清雅平凡，秀气伶俐，身弱多病，中年多灾，晚年吉祥。\n14 嫡 火：克父命，少年艰难，身瘦多病，中年吉祥，欠子之字，环境良好。\n14 端 火：英敏多才，智勇双全，清雅荣贵，中年吉祥，环境良好。\n14 对 火：刑偶伤子，中年劳，晚年吉祥，女人薄幸，再嫁守寡之字。\n14 尔 火：秀气英敏，温和荣贵，中年吉祥，晚年成功隆昌，出国之字。\n14 裹 火：清雅伶俐，出外吉祥，有爱情厄，中年劳，晚年吉祥。\n14 奖 火：有爱情厄，奔波劳苦，中年多劳，晚年吉祥。\n14 尽 火：清雅伶俐，刑偶欠子，有爱情烦恼，再嫁守寡之字。\n14 恺 火：理智充足，一生清雅荣贵，官运旺，中年成功隆昌。\n14 辣 火：秀气伶俐，口快心直，勤俭治家，小心爱情厄，吉祥幸福。\n14 郎 火：性刚有英雄气派，晚婚吉祥，中年平，晚年吉祥，清雅多才，忌车怕水。\n14 连 火：出外吉祥，贵人明现，福禄双收，名利永在，女人不幸多灾。\n14 僚 火：清雅多才，二子吉祥，中年多灾，晚年吉祥，重情失败。\n14 绫 火：出外逢贵得财，多才伶俐，中年劳，晚年吉祥，女人不幸再嫁。\n14 领 火：刑偶伤子，中年多灾，有爱情厄，晚年吉祥，小心牢狱之灾，女人吉祥。\n14 绿 火：清秀多才，中年平凡，晚年吉祥，女人不幸，再嫁之字。\n14 纶 火：克偶伤子，再嫁守寡，中年多灾，晚年吉祥。\n14 嫩 火：多才秀气，肯做肯劳，勤俭治家，中年吉祥，晚年隆昌。\n14 宁 火：温和贤淑，多才巧智，中年成功隆昌，荣贵之字。\n14 裳 火：天生聪颖，刑偶伤子，晚婚大吉，清雅荣贵，中年成功隆昌，出国之字。\n14 台 火：一生清雅，技术大吉，中年奔波，成功隆昌，晚年享福。\n14 态 火：身闲心苦，身弱多病，中年劳或潦倒，晚年吉祥。\n14 叹 火：命途多舛，一生清雅多才，薄幸多灾，短寿多灾难之字。\n14 滕 火：刑偶伤子，或有爱情厄，重情失败，晚年吉祥，晚福之字。\n14 通 火：口快伶俐，刑偶伤子，出外大吉，中年劳，晚年吉祥。\n14 透 火：奔波劳苦，有爱情厄，中年多劳，晚年吉祥。\n14 图 火：一生多才贤能，理智充足，出外大吉，中年吉祥，晚年劳神。\n14 团 火：忧心劳神，怀才不遇，中年劳，晚年吉祥。\n14 荧 火：天生聪颖，秀气伶俐，中年吉祥，忠厚善良，一门鼎盛。\n14 毓 火：学识渊博，清雅荣贵，官运旺，名利双收，出国隆昌之字。\n14 彰 火：学识丰富，清雅多才，中年吉祥，晚年隆昌，名利之字。\n14 祯 火：清雅荣贵，二子吉祥，天生聪颖，中年成功，环境良好。\n14 志 火：口快心直，性刚劳心，中年奔波，晚年成功隆昌。\n14 种 火：智勇双全，勤俭治家，中年平凡，晚年吉祥，环境良好。\n14 逐 火：清雅荣贵，多才巧智，中年成功隆昌，出国之字。\n14 诞 土：出外吉祥，贵人明现，中年平凡，晚年吉祥，一生清雅。\n14 监 土：不祥之字，忧心劳神，身弱短寿，中年多灾，难幸福。\n14 境 土：英敏多才，清雅荣贵，福禄双收，名利有份，出外大吉，荣贵之字。\n14 硕 土：清雅荣贵，多才贤能，中年吉祥，晚年隆昌，二子吉祥。\n14 玮 土：清雅伶俐，天生多才，中年吉祥，晚年隆昌，出国之字。\n14 瑕 土：出外吉祥，秀气伶俐，温和贤淑，中年劳，晚年隆昌。\n14 顼 土：清雅荣贵，二子吉祥，多才贤能，中年成功隆昌，财官两旺。\n14 耶 土：刑偶伤子，百事劳苦，性刚口快，中年平，晚年吉祥。\n14 瑛 土：清雅荣贵，小心爱情厄，成功隆昌，环境良好。\n14 与 土：一生清雅伶俐，多才贤能，中年平凡，晚年隆昌，二子吉祥。\n15 婵 金：秀气多才，福禄双收，名利永在，中年成功隆昌，环境良好。\n15 肠 金：忧心劳神，事劳无功，身弱短寿，难幸福，多灾难。\n15 冲 金：多刑克，不祥之字，一生潦倒困苦，病弱短寿，忌车怕水，难得幸福。\n15 锄 金：刑偶伤子，多才贤能，中年劳或奔波，晚年吉祥。\n15 赐 金：多刑克，破相或多疾，病弱孤独，中年吉祥，短寿之字。\n15 熟 金：一贫如洗，欠子多灾，中年平，晚年劳神，多病困苦之字。\n15 锋 金：财官两旺，出外逢贵，清雅荣贵，安福尊荣。\n15 敷 金：出外吉祥，一生清雅平凡，中年多灾，晚年吉祥。\n15 缄 金：有爱情厄，忌车怕水，中年小心，晚年吉祥。\n15 剑 金：性刚果断，中年劳或奔波，晚年吉祥，有眼疾。\n15 节 金：身弱短寿，二子吉祥，中年吉祥，晚年劳神，清雅多才。\n15 靓 金：多才贤能，勤俭治家，中年吉祥，晚年隆昌。\n15 剧 金：带刀厄，杀人被杀，有牢狱之灾，病弱短寿，一生不幸。\n15 劈 金：带刀厄，不祥之字，一贫如洗，病弱短寿，多灾难，出国之格。\n15 铺 金：一生清雅伶俐，贵人明现，中年平凡，晚年吉祥隆昌。\n15 请 金：清雅温和，伶俐多才，中年平凡，晚年隆昌，环境良好。\n15 趣 金：刑偶伤子，出外吉祥，中年劳，晚年隆昌，女人再嫁守寡。\n15 锐 金：刑偶伤子，清雅伶俐，中年劳，晚年吉祥，小心爱情厄。\n15 赏 金：义利分明，名利双收，二子吉祥，中年吉祥，晚年隆昌。\n15 审 金：福禄双收，一生清雅伶俐，中年劳，晚年吉祥，劳神之字。\n15 蚀 金：秀气荣幸，温和忠厚，中年多灾，晚年吉祥。\n15 数 金：有爱情烦恼，身弱短寿，出外吉祥，中年劳，晚年隆昌，男人多才贤能。\n15 锈 金：小心爱情厄，一生清雅多才，刑偶欠子，晚年吉祥。\n15 绪 金：智勇双全，清雅多才，晚婚迟得子大吉，中年劳，晚年吉祥。\n15 帜 金：有爱情厄，忌车怕水，晚婚迟得子吉，晚年吉祥。\n15 谆 金：晚婚迟得子吉，中年劳，晚年吉祥。\n15 葆 木：智勇双全，清雅多才，中年平凡，晚年隆昌，忌车怕水。\n15 标 木：一生清雅多才，天生聪颖，多子之格，双妻之格。\n15 槽 木：外祥内苦，刑偶伤子，有爱情烦恼，中年劳，晚年吉祥。\n15 樗 木：刑克父母，忧心劳神，身弱多病，中年多灾，晚年吉祥。\n15 葱 木：雨夜之花，暗淡无光，一生多灾，再嫁守寡，身弱短寿。\n15 稻 木：身瘦多才，清雅温和，中年劳或奔波，晚年吉祥。\n15 蒂 木：清雅多才，秀气贤能，中年吉祥，晚年隆昌幸福。\n15 面 木：刑偶伤子，早婚半途，有爱情烦恼，中年劳，晚年吉祥。\n15 樊 木：多刑克，多灾难，刑偶伤子，一贫如洗，配合得宜，成功隆昌。\n15 巩 木：性刚口快，武官大吉，刑偶伤子，中年劳，晚年吉祥。\n15 广 木：刑克父母，一生清雅伶俐，身弱多才，中年劳，晚年吉祥，教育界大吉。\n15 郭 木：一生清雅，智勇双全，中年劳或奔波，晚年吉祥隆昌。\n15 葫 木：忧心劳神，一贫如洗，有爱情烦恼，难幸福，再嫁守寡之字。\n15 价 木：克父命，多才巧智，清雅伶俐，二子吉祥，晚年隆昌。\n15 驾 木：多相克，清雅多才，中年劳或奔波，晚年吉祥。\n15 稼 木：福禄双收，名利有份，出外吉祥，中年成功隆昌。\n15 俭 木：疾病困苦，事劳无功，肯做肯劳，勤俭治家，难幸福。\n15 箭 木：多相克，中年奔波劳苦，多灾难，晚年吉祥。\n15 娇 木：有爱情烦恼，刑偶伤子，再嫁守寡，病弱短寿，晚年隆昌。\n15 颉 木：清雅荣贵，智勇双全，官运旺，名利双收，二子吉祥，出国之字。\n15 驹 木：秀气贤能，清雅荣贵，福禄双收，环境良好，小心爱情厄。\n15 慷 木：一生慷慨待人，智勇双全，中年劳或奔波，晚年吉祥。\n15 靠 木：多才温和，清雅伶俐，中年劳，晚年吉祥，福禄双收。\n15 课 木：少年艰难，中年平凡，晚年吉祥隆昌，环境良好。\n15 宽 木：清雅多才，荣贵隆昌，中年吉祥，环境良好，女人薄幸，多灾短寿。\n15 款 木：忧心劳神，事劳无功，刑偶欠子，身弱多灾，再嫁守寡之字。\n15 葵 木：清雅多才，秀气伶俐，官运旺，中年成功隆昌，环境良好。\n15 楼 木：学问丰富，福禄双收，智勇双全，武官大吉，成功隆昌，兴家之字。\n15 模 木：清雅荣贵，多才贤能，中年成功隆昌，晚年环境良好，出国之格。\n15 篇 木：天生聪颖，秀气巧妙，中年劳或潦倒，晚年吉祥。\n15 庆 木：福禄双收，智勇双全，名利双收，一生多才，环境良好。\n15 穷 木：潦倒一生，一贫如洗，一生难幸福，中年劳，晚年吉祥。\n15 枢 木：清雅多才，福禄双收，名利有份，成功隆昌。\n15 妩 木：刑偶伤子，贫苦多舛，身弱多病，一生困苦多灾。\n15 贤 木：二子吉祥，多才巧智，中年平，晚年吉祥，但短寿。\n15 箱 木：小心爱情厄，一生清雅温和，中年吉祥，晚年劳神，不幸之字。\n15 萱 木：学识渊博，一生多才，清雅荣贵，官运旺，福寿出国。\n15 样 木：性刚口快，少年艰难，中年劳，晚年吉祥，出外吉祥。\n15 仪 木：忠厚善良，勤俭伶俐，名利双收，清雅荣贵，富贵之字。\n15 谊 木：温和多才，贤能勤俭，财官皆旺，中年成功隆昌。\n15 毅 木：学识渊博，清雅荣贵，出外吉祥，出国之字，多才贤能。\n15 莹 木：名利双收，智勇双全，中年成功隆昌，出国之字。\n15 樟 木：忠厚善良，勤俭治家，一生中年多灾，晚年吉祥。\n15 箴 木：口快心直，一生清雅伶俐，出外吉祥，中年平凡，晚年吉祥，刑偶伤子。\n15 褒 水：出外吉祥，多才贤能，义利分明，中年劳，晚年吉祥。\n15 暴 水：性刚口快，口才伶俐，中年多灾，晚年吉祥。\n15 辈 水：忧心劳神，性刚果断，中年多灾，晚年吉祥，子孙兴旺。\n15 编 水：秀气伶俐，多才贤能，中年劳，或潦倒，晚年吉祥。\n15 蝙 水：忧心劳神，刑偶伤子，中年劳，晚年吉祥。\n15 饼 水：秀气伶俐，天生聪颖，中年多灾，女人有爱情厄。\n15 部 水：刑偶伤子，中年劳苦，家庭不和，晚年吉祥。\n15 醇 水：天生聪明，理智充足，清雅多才，中年吉祥，晚年隆昌。\n15 范 水：胆识丰富，多才贤能，中年劳，出外吉祥，晚年昌盛。\n15 蝠 水：刑克父母，忧心劳神，一贫如洗，刑偶伤子。\n15 赋 水：多愁多劳，命途多舛，身弱短寿，忌车怕水，孑然一身。\n15 虢 水：英敏性刚，武官大吉，清雅荣贵，忠厚多才，出国之格，荣昌之字。\n15 汉 水：义利分明，荣贵隆昌，刑偶欠子，中年平，晚年吉祥，英雄之格。\n15 滹 水：刑偶伤子，性刚果断，中年多灾，晚年吉祥。\n15 浒 水：口才伶俐，一生聪明，中年劳，晚年隆昌，清闲之字。\n15 辉 水：性刚果断，幼年多灾，中年吉祥，晚年隆昌，环境良好，出国之字。\n15 慧 水：聪明伶俐，清雅温和，中年劳，晚年吉祥。\n15 履 水：英敏佳人，上下敦睦，出外吉祥，中年吉祥，晚年隆昌。\n15 卖 水：刑偶伤子，忧心劳神，中年多灾，晚年享福，二子吉祥。\n15 满 水：有爱情烦恼，身弱短寿，难幸福，再嫁守寡，成功隆昌。\n15 慢 水：秀气伶俐，多才贤能，出外吉祥，中年平凡，晚年隆昌。\n15 漫 水：秀气温和，勤俭治家，中年吉祥，晚年隆昌，出外吉祥，出国成功。\n15 貌 水：忧心劳神，损丁破财，中年多灾，晚年吉祥，但劳神之字。\n15 庙 水：清雅荣贵，福禄双收，中年劳，晚年吉祥。\n15 瞑 水：忧心劳神，事劳无功，一生多灾，不祥之字。\n15 摸 水：清雅多才，忠厚善良，医界大吉，中年吉祥，晚年隆昌，忌车怕水。\n15 摩 水：多忧少乐，外祥内苦，中年多舛，晚年吉祥但劳神。\n15 漠 水：清雅荣贵，忠厚善良，中年吉祥，晚年隆昌，忌车怕水。\n15 墨 水：忧心劳神，怀才不遇，中年劳或潦倒，晚年吉祥。\n15 慕 水：性刚果断，有牢狱之灾，多灾难，中年劳苦，晚年吉祥。\n15 暮 水：晚婚迟得子吉，一生多灾，刑偶伤子，晚年吉祥。\n15 盘 水：身瘦伶俐，刑克父母，中年吉祥，晚年劳神，长寿之字。\n15 赔 水：福禄双收，智勇双全，中年成功隆昌，环境良好，荣贵之字。\n15 翩 水：忌车怕水，清雅多才，中年劳或克偶，晚年吉祥。\n15 漂 水：福禄双收，少年艰难，中年虽吉多灾，晚年隆昌，短寿之字。\n15 魄 水：不祥之字，一贫如洗，病弱短寿，抱恨九泉，不幸之字。\n15 漱 水：口快心直，刑偶伤子，中年吉祥，晚年劳神，欠子之字。\n15 霆 水：智勇双全，精明公正，出外吉祥，官运旺，中年成功隆昌。\n15 万 水：刑克父母，一生孤劳，事劳无功，虽有成功，但昙花一现。\n15 嬉 水：温和贤淑，福禄双收，中年成功隆昌，秀气伶俐。\n15 虾 水：秀气伶俐，温和贤淑，出外吉祥，中年平，晚年隆昌。\n15 霄 水：聪明伶俐，刑偶欠子，小心爱情厄，中年多劳，晚年吉祥但劳神。\n15 漩 水：温和伶俐，清雅贤淑，中年劳苦，晚年隆昌。\n15 演 水：一生清雅多才，家声克振，中年吉祥，晚年劳神，二子吉祥。\n15 漪 水：秀气伶俐，温和贤淑，中年吉祥，晚年隆昌，短寿之字。\n15 渔 水：一生清雅伶俐，多才福寿，环境良好。\n15 涨 水：忧心劳神，刑偶欠子，出外吉祥，中年多灾，晚年吉祥。\n15 震 水：勤俭建业，家声克振，智勇双全，武官吉祥，中年有灾。\n15 渍 水：福祉绵远，克己助人，智勇双全，中年吉祥，环境良好。\n15 皑 火：多才巧智，多才贤能，官运旺，中年成功隆昌，出国之字。\n15 层 火：英雄格，秀气伶俐，一生多灾，晚婚吉，晚年吉祥。\n15 彻 火：出外吉祥，清雅多才，中年劳或奔波，晚年吉祥，环境良好。\n15 除 火：勤俭持家，二子吉祥，忌车怕水，中年劳，晚年吉祥。\n15 弹 火：性刚果断，一生多灾，身弱多劳，虽有才能，难望幸福。\n15 德 火：多才巧智，温和贤能，中年劳，晚年成功隆昌，环境良好。\n15 敌 火：忧心劳神，事劳无功，中年多灾，晚年吉祥，劳神之字。\n15 缔 火：一生清雅，秀气伶俐，福禄双收，名利有份，清贵之字。\n15 调 火：福禄双收，重信用，多才伶俐，中年吉祥，环境良好。\n15 蝶 火：有爱情烦恼，刑偶伤子，秀气伶俐，中年吉祥，晚年劳神。\n15 董 火：英敏才人，理智充足，中年吉祥隆昌，晚年劳神。\n15 缎 火：多才贤能，清雅荣贵，中年劳，晚年吉祥，出外大吉。\n15 缓 火：清雅秀气，小心爱情厄，中年劳，晚年吉祥，出外隆昌。\n15 践 火：智勇双全，温和精诚，忌车怕水，中年有灾，晚年吉祥。\n15 瑾 火：智勇双全，多才贤能，中年成功隆昌，学识渊博，出国之字。\n15 进 火：天生聪颖，刑偶伤子，中年平凡，吉祥隆昌，出外大吉，环境良好。\n15 乐 火：英敏多才，子孙兴旺，中年多灾，晚年吉祥隆昌。\n15 厉 火：刑偶伤子，清雅英敏，中年平凡，晚年吉祥，荣幸之字。\n15 练 火：福禄双收，克己助人，安福尊荣，女人小心爱情厄，环境良好。\n15 谅 火：一生保守平凡，晚婚迟得子大吉，中年多灾，晚年吉祥。\n15 寮 火：天生聪颖，清雅多才，中年劳，晚年吉祥，环境良好。\n15 刘 火：英敏之才，清雅伶俐，二子吉祥，中年劳，晚年吉祥。\n15 鲁 火：多才贤能，温和伶俐，晚婚迟见子吉，中年劳，晚年隆昌。\n15 虑 火：一生清雅伶俐，多才贤能，中年劳，晚年吉祥。\n15 轮 火：有才能理智，清雅伶俐，中年劳，晚年吉祥，女人有爱情烦恼。\n15 论 火：克父命，清雅多才，温和伶俐，中年劳，晚年吉祥。\n15 鼐 火：学识渊博，清雅荣贵，中年成功隆昌，官运旺，出国之格。\n15 闹 火：少年艰难，离祖成功，中年劳，晚年吉祥。\n15 僻 火：忧心劳神，事劳无功，一生命途多舛，病弱短寿。\n15 热 火：一贫如洗，身弱多病，刑偶伤子，中年吉祥，晚年劳神。\n15 谈 火：性刚口快，口才伶俐，多才清雅，中年劳，晚年吉祥。\n15 瑭 火：多才贤能，温和忠厚，勤俭治家，中年吉祥，清雅平凡。\n15 缇 火：晚婚迟得子大吉，出外吉祥，中年平，晚年吉祥，女人小心爱情厄。\n15 腰 火：父母无缘，忧心劳神，中年吉祥，晚年劳神，平凡欠子之字。\n15 暂 火：晚婚迟得子吉，中年劳，晚年吉祥。\n15 摘 火：刑偶欠子，清雅多才，福禄双收，中年吉祥，晚年劳神。\n15 阵 火：忧心劳神，事劳无功，中年吉祥，晚年多灾，不幸短寿。\n15 征 火：刑偶伤子，智勇双全，重情失败，成功隆昌，精诚之字。\n15 质 火：秀气多才，温和贤淑，二子吉祥，中年吉祥隆昌。\n15 驻 火：义利分明，智勇双全，刑偶伤子，中年吉祥，晚年隆昌。\n15 鞍 土：晚婚迟得子吉，多才机敏，中年劳，晚年吉祥。\n15 墀 土：精明公正，官运旺，智勇双全，清雅荣贵，中年劳，晚年成功。\n15 磁 土：多相克，命硬，少年艰难，中年劳苦，晚年隆昌，二子吉祥。\n15 磋 土：父母无缘，兄弟无靠，中年多灾，晚年吉祥。\n15 墩 土：出外吉祥，忧心劳神，刑偶伤子，晚年吉祥。\n15 堕 土：一生清雅荣贵，精明公正，中年成功隆昌，环境良好。\n15 欧 土：一生清雅，英敏伶俐，晚年吉祥。\n15 坟 土：肯做肯劳，重信用，中年离乱，再嫁之字，身弱多灾，环境良好。\n15 糊 土：智勇双全，克己助人，中年吉祥，晚年劳神。\n15 蝴 土：秀气伶俐，多才贤能，刑偶伤子，中年隆昌，晚年劳神。\n15 磐 土：多相克，一生清雅平凡，晚婚吉祥，晚年隆昌。\n15 确 土：忧心劳神，清雅秀气，中年多灾，晚年吉祥。\n15 豌 土：秀气伶俐，出外吉祥，中年劳，晚年隆昌，一生幸福。\n15 慰 土：智勇双全，清雅荣贵，中年内心多苦，晚年吉祥，劳神之字。\n15 娴 土：秀气温和，勤俭制家，中年吉祥，晚年隆昌，出国之字。\n15 养 土：忠厚善良，义利分明，福寿绵长，勤俭治家，环境良好，子孙兴旺。\n15 叶 土：温和慈善，一生勤敏，耐力强，言多必失，晚年吉祥。\n15 亿 土：清雅平凡，保守之格，刑偶欠子，中年吉祥，晚年隆昌，短寿之字。\n15 逸 土：一生奔波劳苦，怀才不遇，智勇双全，中年劳，晚年隆昌。\n15 影 土：义利分明，清雅多才，中年吉祥，晚年隆昌，荣贵之字。\n15 忧 土：不祥之字，忧心劳神，事劳无功，出外吉祥，一贫如洗。\n15 邮 土：忧心劳神，少年艰难，中年平凡，晚年吉祥，伶俐之字。\n15 院 土：清雅伶俐，多才巧智，中年吉祥，晚婚吉，晚年劳神。\n15 阅 土：勤俭持家，肯做肯劳，多才贤能，中年劳，晚年吉祥。\n15 增 土：福禄双收，名利有份，中年吉祥，晚年隆昌，荣贵之字。\n15 徵 土：学问丰富，名利双收，清雅荣贵，出国之字，子孙兴旺。\n16 侪 金：清雅荣贵，勤俭治家，官运旺，中年成功隆昌，出国之字。\n16 锤 金：义利分明，克己助人，中年成功隆昌，环境良好。\n16 錞 金：秀气英敏，清雅荣贵，中年吉祥，晚年隆昌，环境良好。\n16 错 金：晚婚迟得子吉，多才温和，小心爱情厄，中年吉祥，晚年隆昌。\n16 雕 金：智勇双全，清雅多才，中年平凡，晚年隆昌，劳神之字。\n16 锭 金：刑偶伤子，出外吉祥，清雅荣贵，中年隆昌，晚年劳神，温和之字。\n16 醒 金：有爱情烦恼，一生多才，内心多忧，晚年吉祥。\n16 钢 金：口快心直，武官大吉，中年劳，刑偶伤子，晚年吉祥。\n16 辑 金：口才伶俐，多才有能，中年吉祥，晚年隆昌，名利之字。\n16 锦 金：吉凶分明，吉则清贵隆昌，出国富贵，凶则忌车怕水，恶死凶亡。\n16 静 金：多才贤能，清雅伶俐，中年平凡，晚年吉祥，小心爱情厄。\n16 锯 金：克父命，刑偶伤子，中年劳或多灾，福禄双收，晚年隆昌。\n16 穆 金：一生清雅贤能，有才能，英俊但中年劳，晚年吉祥。\n16 凭 金：出外吉祥，多才清雅，中年成功隆昌，晚年倍加隆昌。\n16 錡 金：清雅荣贵，多才贤能，成功隆昌，官运旺，女人有爱情厄。\n16 钱 金：一生清雅伶俐，小巧多才，中年奔波，晚年吉祥隆昌。\n16 嫱 金：秀气伶俐，勤俭肯劳，中年小心爱情厄，晚年吉祥，幸福之字。\n16 儒 金：多才贤能，精明公正，官运旺，荣贵隆昌，环境良好。\n16 睿 金：天生聪颖，多才忠厚，成功隆昌，环境良好，出国之字。\n16 颓 金：一生清雅多才，二子吉祥，中年劳或奔波，晚年吉祥。\n16 羲 金：温和贤能，义利分明，官运旺，多才忠厚，成功隆昌。\n16 谖 金：出外逢贵得财，温和贤能，中年多劳，晚年吉祥。\n16 谒 金：口才伶俐，勤俭治家，中年吉祥，有离乱之灾，晚年吉祥。\n16 谕 金：胆识丰富，精明公正，官运旺，中年成功隆昌，出国之字。\n16 战 金：口快心直，多才贤能，多刑克，中年吉祥，晚年劳神。\n16 铮 金：精明公正，克己助人，清雅荣贵，官运旺，中年成功隆昌，出国之字。\n16 整 金：妻贤子贵，一生清雅，义利分明，中年吉祥，晚年隆昌。\n16 诸 金：清雅多才，温和贤淑，晚婚迟得子吉，中年劳，晚年吉祥。\n16 锥 金：一生清雅，多才巧智，一门鼎盛，环境良好。\n16 苍 木：一生清雅平凡，天生聪颖，福禄双收，中年劳，晚年吉祥。\n16 笃 木：奔波劳苦，中年多灾，晚年吉祥。\n16 萼 木：秀气伶俐，刑偶伤子，事劳无功，中年劳，晚年吉祥。\n16 树 木：一生清雅多才，特有人缘，中年劳，晚年吉祥，克父命，环境良好。\n16 龟 木：多妻，中年吉祥隆昌，刑偶欠子，晚年劳神，环境良好。\n16 过 木：暗淡无光，忧心劳神，事劳无功，一生多灾，晚年吉祥。\n16 横 木：刑克父母，二子吉祥，一生英敏多才，中年吉祥，晚年隆昌。\n16 桦 木：温和贤能，多才忠厚，中年吉祥，晚年隆昌，官旺，出国之字。\n16 机 木：口快心直，一生奔波大吉，中年多劳但隆昌，晚年荣幸。\n16 冀 木：怀才不遇，外祥内苦，中年多劳，晚年吉祥，二子吉祥。\n16 颊 木：忧心劳神，二子吉祥，一生清雅，贵人明现，晚年吉祥。\n16 憬 木：妻闲子贵，义利分明，中年成功隆昌，官或财旺，环境良好。\n16 橘 木：义利分明，安富尊荣，中年吉祥隆昌，晚年劳神。\n16 举 木：小心爱情烦恼，天生聪颖，中年劳，晚年吉祥。\n16 麇 木：清秀伶俐，温和贤淑，中年吉祥，晚年隆昌，出国之字。\n16 裤 木：一生清雅伶俐，秀气伶俐，中年劳，晚年吉祥，女人不幸之字。\n16 窥 木：有情有义，英雄格，中年劳，性刚口快，晚年吉祥。\n16 梦 木：清雅荣贵，中年吉祥，环境良好，女人刑偶伤子，不幸之字。\n16 器 木：福禄双收，口快心直，多才贤能，刑偶伤子，有爱情烦恼，晚年隆昌。\n16 褰 木：暗淡无光，一贫如洗，中年多灾，晚年吉祥，再嫁守寡之字。\n16 黔 木：忧心劳神，事劳无功，中年劳，晚年吉祥，环境良好。\n16 桥 木：多才温和，清雅伶俐，福禄双收，刑偶伤子，晚婚吉，晚年吉祥。\n16 亲 木：意志强，抱负大，但怀才不遇，中年多劳，晚年吉祥。\n16 蓉 木：温和忠厚，福禄双收，多才贤能，中年成功隆昌，出国之字。\n16 县 木：小心爱情厄，智勇双全，中年劳，忌车怕水，晚年吉祥。\n16 筱 木：出外吉祥，秀气巧妙，多才贤能，中年吉祥，晚年隆昌，幸福之字。\n16 谐 木：一生清雅平凡，晚婚大吉，中年劳，晚年吉祥隆昌。\n16 蓄 木：多才贤能，清雅伶俐，中年劳，勤俭治家，晚年吉祥。\n16 谚 木：精明公正，重信用，福禄双收，成功隆昌，环境良好。\n16 窑 木：英敏多才，清雅荣贵，中年成功隆昌，劳神多灾。\n16 颖 木：智勇双全，义利分明，中年平凡，晚年吉祥，二子兴旺之字。\n16 遇 木：奔波劳苦，身弱多病，中年劳，怀才不遇，晚年吉祥。\n16 圜 木：有爱情厄，小心多才，英敏勤俭，中年劳，晚年吉祥。\n16 蓁 木：清雅荣贵，学识渊博，中年成功隆昌，官运旺，出国之字。\n16 筑 木：智勇双全，清雅荣贵，中年吉祥，晚年隆昌，出国之字。\n16 樽 木：刑偶伤子，身弱多病，中年劳或潦倒，晚年吉祥，忌车怕水。\n16 遍 水：性刚果断，奔波劳苦，出外吉祥，晚年隆昌。\n16 潮 水：多才巧智，清雅伶俐，中年劳或刑偶，晚年吉祥隆昌。\n16 澄 水：多才贤能，英敏伶俐，中年平，晚年吉祥，环境良好。\n16 霖 水：学问丰富，清雅荣贵，官运旺，精明公正，出国之字，富贵之格。\n16 霏 水：清雅多才，福禄双收，中年吉祥，小心爱情厄，晚年隆昌。\n16 奋 水：英敏之才，清雅荣贵，中年吉祥，小心爱情厄，出国成功之字。\n16 愤 水：二子吉祥，性刚果断，身弱短寿，中年吉祥，晚年多病。\n16 颔 水：清雅伶俐，二子吉祥，中年平凡，晚年隆昌，名利之字。\n16 潢 水：克父命，身瘦多才，贤能温和，中年吉祥，晚年隆昌。\n16 浇 水：刑偶伤子，克父命，出外吉祥，中年平，晚年隆昌，官运旺。\n16 洁 水：忧心劳神，事劳无功，有爱情烦恼，不幸再嫁。\n16 溃 水：清雅荣贵，勤俭治家，家声克振，二子吉祥，环境良好。\n16 瞒 水：忧心劳神，事劳无功，有爱情烦恼，短寿自杀。\n16 默 水：清闲伶俐，多才敦睦，中年成功隆昌，出国之格，忌木类。\n16 谋 水：出外吉祥，温和多才，中年劳但吉祥，晚年隆昌。\n16 霓 水：秀气伶俐，清雅荣贵，中年吉祥，小心爱情厄，出国成功。\n16 陪 水：理智充足，一生清雅伶俐，福禄双收，一生平凡，保守之字。\n16 霈 水：性刚果断，温和多才，中年吉祥，晚年隆昌，环境良好。\n16 润 水：福禄双收，福寿兴家，环境良好，安富尊荣。\n16 潭 水：克偶欠子，清雅伶俐，中年吉祥，晚年劳神，清雅之字\n16 宪 水：小心爱情厄，有才能，官旺英敏伶俐，晚年隆昌。\n16 兴 水：温和英敏，清雅多才，中年劳，晚年隆昌，忌车怕水，刑偶欠子。\n16 学 水：外祥内忧，多才贤能，中年劳，刑偶伤子，晚年吉祥。\n16 陈 火：口快心直，清雅多才，中年劳苦，晚年吉祥。\n16 炽 火：精力旺盛，刑偶伤子，出外吉祥，晚婚大吉，成功隆昌，荣贵之字。\n16 俦 火：学问丰富，官运旺，一生清雅，成功隆昌，身弱多疾。\n16 撮 火：刑克父母，刑偶伤子，出外吉祥，中年劳，晚年吉祥。\n16 达 火：学识渊博，安富尊荣，富寿兴家，成功隆昌，出国之字，官旺。\n16 导 火：小心爱情厄，多才英雄，中年多灾，晚年吉祥，欠子之字。\n16 道 火：智勇双全，精明公正，出外大吉，中年成功隆昌，荣贵出国之字。\n16 灯 火：忧心劳神，事劳无功，中年多灾，晚年安详。\n16 谛 火：口才伶俐，多才贤能，成功隆昌，女人有爱情厄，晚年多疾。\n16 都 火：清雅多才，温和贤能，中年平凡，晚年吉祥，清闲之字。\n16 炖 火：一生多才，中年劳，忧心劳神，晚年吉祥，离祖成功。\n16 积 火：天生聪颖，一生温和多才，二子吉祥，白手成家，晚年隆昌。\n16 赖 火：谋为出众，清雅多才，中年劳，晚年吉祥，环境良好。\n16 擂 火：一生清雅多才，忌车怕水，刑偶欠子，孤独守寡，长寿之字。\n16 璃 火：不祥之字，多灾难，身弱多病，中年多灾，晚年吉祥。\n16 罹 火：一生清雅，谋为出众，中年劳或多灾，晚年吉祥。\n16 历 火：晚婚迟得子吉，多忧少乐，中年劳，晚年吉祥，刑偶伤子。\n16 琏 火：学识渊博，福禄双收，名利永在，中年成功隆昌，环境良好，出国之格。\n16 陵 火：常有祸端，智勇双全，中年成功隆昌，晚年多灾。\n16 遛 火：出外逢贵得财，名利双收，中年劳，晚年隆昌。\n16 龙 火：克父命，晚婚吉祥，中年多灾，潦倒外出，晚年平凡，多灾之字。\n16 卢 火：带血字，多刑克，晚婚吉，中年多劳，晚年吉祥。\n16 陆 火：性直口快，少年艰难，中年吉祥，或奔波，晚年隆昌。\n16 录 火：智勇双全，性刚口快，中年劳或潦倒，晚年吉祥，环境良好。\n16 燃 火：清雅荣贵，财官两旺，福禄双收，名利有份，环境良好，享福之字。\n16 烧 火：清雅伶俐，身弱短寿，出外吉祥，中年多灾，短寿多舛。\n16 遂 火：一生清雅多才，贤能慷慨，中年劳，晚年吉祥，出外之字。\n16 昙 火：暗淡无光，身弱多病，中年有灾，晚年吉祥，不幸短寿。\n16 糖 火：福禄双收，口快心直，小心爱情厄，晚年吉祥。\n16 螗 火：多才巧智，福禄双收，中年吉祥，晚年隆昌，环境良好。\n16 陶 火：多才伶俐，温和贤淑，中年吉祥，晚年隆昌。\n16 蹄 火：性刚果断，身弱短寿，中年劳苦，晚年吉祥，不幸之字。\n16 头 火：克偶伤子，二子吉祥，欠子，中年平凡，晚年隆昌，环境良好。\n16 熹 火：清雅荣贵，克己助人，多才温和，中年吉祥，晚年隆昌。\n16 晓 火：胆识丰富，理智充足，出外大吉，官运旺，清雅荣贵，出国之字。\n16 璇 火：出外吉祥，小心爱情厄，早婚不和，中年劳，晚年成功隆昌。\n16 焰 火：性刚果断，身弱多病，中年多灾，忌车怕水。\n16 鸯 火：温和贤淑，多才伶俐，克己助人，中年劳，晚年吉祥。\n16 烨 火：秀气多才，温和贤淑，中年吉祥，晚年隆昌，幸福荣贵之字。\n16 璋 火：福禄双收，理智充足，吉凶分明，吉则环境良好隆昌，凶则短寿多灾。\n16 臻 火：温和多才，操守廉正，中年成功隆昌，官运旺，出国享福之字。\n16 谘 火：福禄双收，清雅荣贵，中年成功隆昌，官运旺，出国隆昌。\n16 壁 土：刑偶伤子，一生清雅多才，中年吉祥，晚年隆昌，一生享福。\n16 衡 土：刑偶伤子，清雅伶俐，中年吉祥，晚年劳神，保守之字。\n16 磨 土：一生清雅荣贵，奔波劳苦，内心多忧，中年劳，晚年吉祥。\n16 融 土：慈祥有德，一生成功隆昌，所谋如意，环境良好。\n16 坛 土：一生安稳收己，勤俭治家，中年吉祥，晚年劳神。\n16 谓 土：刑偶伤子，一生多才，忠厚善良，晚年隆昌。\n16 歙 土：不祥之字，一生多病，短寿损丁，常生祸端。\n16 遐 土：清雅伶俐，一生多才温和，中年吉祥，晚年隆昌，出国之字。\n16 鸭 土：多忧少乐，中年劳苦，晚年吉祥，贤能多才，环境良好。\n16 燕 土：天生聪颖，清雅多才，忌车怕水，中年吉祥，晚年隆昌。\n16 阴 土：一生清雅多才，福禄双收，环境良好，女人不幸。\n16 豫 土：忧心劳神，有爱情厄，中年劳，晚年吉祥，身弱短寿。\n16 鸳 土：虽清雅多才，温和伶俐，难逃恶运，中年离乱，再嫁守寡之字。\n16 运 土：福禄双收，出外吉祥，清雅荣贵，官运旺，环境良好，出国之字。\n17 操 金：福禄双收，清雅伶俐，中年劳苦，晚年吉祥，女人身弱。\n17 禅 金：温和贤能，怀才不遇，中年劳，晚年吉祥。\n17 偿 金：二子吉祥，贤能勤俭，肯做肯劳，义利分明，成功隆昌。\n17 聪 金：环境良好，理智充足，晚年隆昌，人缘佳。\n17 镀 金：多才巧智，清雅伶俐，中年成功隆昌，子孙兴旺。\n17 锻 金：贤能多才，子孙兴旺，温和伶俐，忠厚善良，环境良好，保守之字。\n17 锅 金：福禄双收，英敏多才，怀才不遇，中年劳，晚年吉祥。\n17 徽 金：多才贤能，温和勤俭，中年成功隆昌，出国之字，名利双收。\n17 蹇 金：有爱情烦恼，身弱多病，刑偶伤子，多灾难，不祥之字。\n17 饯 金：一生清雅平凡，中年劳，晚年吉祥，小心爱情烦恼，晚年荣幸。\n17 键 金：天生聪颖，富贵双全，一生名利双收，成功隆昌，官运旺。\n17 骏 金：官或财旺，天生聪颖，出外大吉，富贵隆昌，出国之字。\n17 链 金：清雅荣贵，官运旺，中年成功隆昌，女人有爱情烦恼，病弱短寿。\n17 镁 金：出外吉祥，一生清雅伶俐，平凡安详之字。\n17 縻 金：清雅秀气，小心爱情厄，中年劳，晚年吉祥，短寿之字。\n17 锹 金：有爱情烦恼，病弱短寿，刑偶欠子，中年平，晚年吉祥。\n17 赛 金：清雅多才，秀气伶俐，二子吉祥，忌车怕水，晚年劳神。\n17 声 金：名利双收，福禄永在，清雅荣贵，中年成功，双妻之格。\n17 瞬 金：英敏贤能，克父命，中年劳，晚年吉祥，环境良好。\n17 耸 金：清雅多才，温和贤能，中年劳，晚年隆昌。\n17 缩 金：有爱情烦恼，再嫁守寡，刑偶伤子，一生难幸福。\n17 锡 金：温和多才，理智充足，中年劳，成功隆昌，出国之字。\n17 鲜 金：清雅荣贵，多才贤能，中年吉祥，晚年隆昌，名利双收。\n17 谢 金：一生清雅多才，伶俐勤俭，中年多劳，晚年吉祥。\n17 逊 金：奔波劳苦，怀才不遇，中年多灾，晚年隆昌，子孙兴旺。\n17 翼 金：英敏佳人，二子吉祥，有才能理智，中年劳，晚年吉祥。\n17 糟 金：忧心劳神，事劳无功，刑偶伤子，中年劳，晚年吉祥。\n17 斋 金：学问丰富，官运旺，福禄双收，清雅荣昌，富贵之字。\n17 总 金：一生清雅多才，义利分明，中年劳，晚年吉祥，双妻之格。\n17 馆 木：一生清雅伶俐，福禄双收，中年有灾，晚年吉祥。\n17 桧 木：多才贤能，中年成功隆昌，环境良好，晚年劳神。\n17 豁 木：忧心劳神，怀才不遇，小心爱情厄，晚年隆昌，福禄之字。\n17 击 木：有爱情烦恼，事劳无功，中年多灾，身弱短寿。\n17 玑 木：温和贤能，清雅荣贵，中年成功隆昌，官运旺，晚年劳神。\n17 觊 木：智勇双全，清雅荣贵，官运旺，中年成功隆昌，出国之格。\n17 艰 木：有爱情烦恼，刑偶伤子，中年多灾，晚年吉祥，难幸福。\n17 检 木：性刚果断，少年失怙，中年多灾，刑偶伤子。\n17 讲 木：口才伶俐，言心守信，和气敦睦，中年平，晚年吉祥，环境良好。\n17 矫 木：有爱情烦恼，刑偶伤子，福禄双收，中年劳，晚年吉祥。\n17 鞠 木：智勇双全，清雅荣贵，出国之字，中年成功隆昌。\n17 糠 木：忧心劳神，事劳无功，中年劳或潦倒，晚年吉祥。\n17 颗 木：精明公正，忠厚善良，二子吉祥，中年成功隆昌，环境良好。\n17 恳 木：一生清雅多才，温和贤能，中年劳，晚年吉祥，劳神之字。\n17 莲 木：吉凶分明，吉则多才贤能，出国隆昌，凶则刑偶伤子，病弱短寿。\n17 联 木：事业如意，成功隆昌，环境良好，官或财旺，荣贵之字。\n17 敛 木：忧心劳神，刑偶伤子，中年多灾，病弱短寿，不祥之字。\n17 蔓 木：秀气温和，多才贤能，中年吉祥，晚年隆昌，荣贵幸福，出国之字。\n17 懋 木：智勇双全，义利分明，中年成功隆昌，官运旺，出国之字。\n17 蓬 木：清雅荣贵，出外吉祥，中年劳，晚年吉祥，出国之字。\n17 谦 木：英敏佳人，口才伶俐，交际巧妙，中年平凡，晚年吉祥，环境良好。\n17 擎 木：性刚口快，外祥内苦，刑偶伤子，中年多灾，晚年吉祥。\n17 罄 木：英敏清雅，多才贤能，福禄双收，名利有份，荣贵之字。\n17 檀 木：清雅荣贵，多才贤能，中年吉祥，晚年隆昌，出国之格。\n17 蔚 木：清雅荣贵，官运旺，英敏之才，出国之格，成功隆昌。\n17 营 木：忌车怕水，事劳无功，中年多灾，有爱情烦恼，晚年吉祥。\n17 狱 木：清雅荣贵，忌车怕水，中年成功隆昌，官运旺，环境良好。\n17 岳 木：清雅荣贵，一生福禄双收，中年劳，晚年吉庆。\n17 赚 木：勤俭建业，家声克振，福禄双收，中年劳，晚年吉祥。\n17 繁 水：刑偶伤子，晚婚大吉，中年平凡，晚年吉祥，女人身弱短寿。\n17 缝 水：身弱短寿，外祥内苦，中年劳，晚年吉祥，女人薄幸。\n17 缚 水：刑偶伤子，多才英敏，中年成功隆昌，环境良好，老年多灾。\n17 鸿 水：精明公正，学识渊博，官运旺，中年成功隆昌，富贵之字。\n17 璜 水：刑克父母，英敏多才，中年吉祥，二子吉祥，晚年隆昌。\n17 潞 水：福寿兴家，清雅多才，中年吉祥，晚年隆昌，子孙兴旺。\n17 弥 水：出外逢贵得财，精明公正，清雅荣贵，中年成功隆昌。\n17 浓 水：忠厚善良，勤俭治家，中年虽劳，晚年隆昌，环境良好。\n17 蟠 水：多有才能，怀才不遇，中年劳，晚年吉祥，双妻之格。\n17 霜 水：忧心劳神，刑偶伤子，中年劳，晚年吉祥，女人不幸。\n17 禧 水：一生清雅多才，温和贤能，中年吉祥，晚年隆昌，福禄双收。\n17 霞 水：少年艰难，忌车怕水，有爱情烦恼，病弱短寿，晚年吉祥。\n17 乡 水：清雅伶俐，多才勇敢，中年吉祥，晚年隆昌，女人有爱情厄。\n17 亵 水：忧心劳神，事劳无功，中年奔波，晚年幸福。\n17 泽 水：学问丰富，名利双收，官或财旺，智勇双全，一生荣贵。\n17 灿 火：克父命，英敏多才，清雅贤能，中年平凡，晚年吉祥隆昌。\n17 黛 火：有爱情烦恼，身弱短寿，性刚口快，中年有灾，不幸之字。\n17 队 火：出外逢贵得财，清雅伶俐，中年劳，晚年吉祥。\n17 临 火：病弱短寿，事劳无功，自杀他杀，配合吉则成功隆昌。\n17 绩 火：英雄格，二子吉祥，文雅秀气，出国之格，成功隆昌，荣贵之字。\n17 爵 火：官或财旺，一生清雅荣贵，中年成功隆昌，刑偶伤子。\n17 儡 火：忧心劳神，事劳无功，身弱多病，一生多灾，晚年吉祥。\n17 励 火：聪明伶俐，有才能理智，荣贵隆昌，出国之字。\n17 隆 火：克父命，多才小巧，清雅伶俐，中年劳，晚年隆昌。\n17 螺 火：清雅伶俐，身弱多病，中年劳，晚年吉祥。\n17 麋 火：忠厚善良，克己助人，中年吉祥，晚年隆昌，荣贵之字。\n17 黏 火：外祥内苦，或有爱情烦恼，中年多灾，晚年吉祥。\n17 燧 火：清雅荣贵，多才贤能，中年吉祥，晚年隆昌，名利双收，出国之格。\n17 螳 火：刑偶伤子，清雅多才，中年吉祥，晚年劳神，环境良好。\n17 瞳 火：得天时地利，官运旺，一生中年劳，晚年吉祥。\n17 襄 火：出外吉祥，慈祥有德，中年劳，晚年吉祥，福禄双收。\n17 燥 火：福禄双收，性刚口快，中年有灾，晚婚吉。\n17 择 火：一生清雅伶俐，多才贤能，中年劳，晚年吉祥。\n17 烛 火：贵人明现，官运旺，清雅荣贵，中年吉祥，晚年隆昌。\n17 纵 火：出外逢贵，多才贤能，中年吉祥，晚年隆昌，小心爱情厄。\n17 岭 土：福寿兴家，福禄双收，清雅荣贵，官旺隆昌。\n17 壕 土：英雄格，重情失败，出外吉祥，中年劳，晚年吉祥。\n17 壑 土：天生聪颖，清雅荣贵，官运旺，英敏多才，环境良好。\n17 矶 土：刑偶伤子，胆识丰富，中年吉祥，晚年隆昌，环境良好。\n17 阳 土：多才巧智，清雅荣贵，中年多劳，晚年隆昌，环境良好。\n17 应 土：外祥内苦，刑偶伤子，怀才不遇，中年劳，晚年吉祥。\n17 婴 土：清秀聪慧，温和贤淑，中年吉祥，晚年隆昌，环境良好，早婚不宜。\n17 拥 土：性刚口快，多才贤能，荣贵隆昌，短寿劳神。\n17 优 土：出外成功，清雅伶俐，刑偶伤子，晚年吉祥，女人再嫁，守寡之字。\n17 远 土：温和忠厚，勤俭治家，家声克振，少年艰难，忌车怕水，短寿劳神。\n18 翱 金：清雅荣贵，福禄双收，操守廉正，出国之格，隆昌之字。\n18 璨 金：刑偶伤子，智勇双全，中年劳，晚年成功隆昌。\n18 蝉 金：天生聪颖，智勇多才，中年吉祥，晚年隆昌，幸福之字。\n18 储 金：晚婚迟得子吉，清雅伶俐，中年平凡，晚年隆昌，环境良好。\n18 环 金：出外吉祥，天生聪颖，一生温和贤能，晚婚大吉，出国之格。\n18 秽 金：温和伶俐，多才巧智，出外吉祥，中年成功隆昌。\n18 铠 金：精明公正，精诚多才，中年成功隆昌，官运旺，出国之字。\n18 镕 金：天生聪颖，福禄双收，忠厚善良，中年成功隆昌，环境良好，出国之字。\n18 缮 金：福禄双收，多才贤能，克己助人，中年平凡，晚年吉祥隆昌。\n18 双 金：多才清雅，中年平，晚年吉祥，女人刑偶伤子，外祥内苦。\n18 锁 金：二子吉祥，清雅荣贵，精明公正，中年平凡，晚年隆昌。\n18 镒 金：带血字，英敏贤能，刑偶伤子，身弱多病，晚年吉祥。\n18 镇 金：英敏多才，贤能勤俭，出国之格，忌车怕水，中年劳，晚年隆昌。\n18 织 金：晚婚迟得子吉，小心爱情厄，中年多灾，晚年隆昌，身弱短寿。\n18 颛 金：学识渊博，精明公正，克己助人，中年成功隆昌，二子吉祥。\n18 槌 木：忧心劳神，一贫如洗，命途多舛，一生难幸福。\n18 鹄 木：天生聪颖，多才贤能，中年平凡，晚年吉祥，环境良好。\n18 瞽 木：身弱多病，刑偶伤子，中年多灾，晚年吉祥劳神。\n18 归 木：少年艰难，英俊多才，中年吉祥，刑偶伤子，晚年隆昌。\n18 簧 木：温和贤能，多才伶俐，中年劳或奔波，官运旺，晚年隆昌。\n18 获 木：性刚果断，有勇无谋，怀才不遇，武官吉，中年吉祥，晚年劳神。\n18 睑 木：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n18 简 木：一生清雅伶俐，有才能理智，中年劳，晚年吉祥。\n18 槛 木：一生清雅，多才贤能，刑偶伤子，中年吉祥，晚年隆昌，官运旺。\n18 谨 木：义利分明，清雅荣贵，中年劳，晚年吉祥，环境良好。\n18 旧 木：刑偶伤子，事劳无功，中年多灾，晚年吉祥，女人不幸。\n18 鹃 木：清雅多才，小心爱情厄，中年平凡，晚年吉祥隆昌。\n18 拦 木：天生聪颖，多才贤能，中年平凡，晚年隆昌。\n18 拟 木：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n18 骐 木：清秀英俊，多才享福，中年吉祥，晚年隆昌，环境良好。\n18 骑 木：刑偶伤子，晚婚大吉，福禄双收，贵人明现，中年劳，晚年吉祥。\n18 翘 木：清雅伶俐，多才贤能，智勇双全，官运旺，出国之字。\n18 璩 木：性刚，常生祸端，恶死凶亡，中年小心，晚年平凡。\n18 绕 木：清雅贤能，理智充足，中年平，晚年吉祥，女人小心爱情厄。\n18 蕊 木：小心爱情厄，秀气伶俐，薄幸短寿，不幸再嫁，守寡之字。\n18 黠 木：有爱情厄，一生清雅平凡，身弱多病，晚福之字。\n18 簪 木：有爱情烦恼，晚婚迟得子大吉，中年有灾，晚年吉祥。\n18 鞭 水：英雄豪杰，口快性刚，中年劳，晚年成功隆昌，欠子之字。\n18 滨 水：英敏多才，清雅贤能，二子吉祥，忌车怕水，中年平，晚年吉祥。\n18 闯 水：刑偶伤子，一生多灾，中年劳苦，忌车怕水，晚年吉祥。\n18 翻 水：有才能理智，难遇知己，中年用人小心，晚年吉祥，重情失败。\n18 覆 水：少年艰难，中年多灾，身弱奔波，晚年吉祥隆昌。\n18 馥 水：秀气伶俐，清雅荣贵，出国之字，官运旺盛，中年成功隆昌。\n18 济 水：清雅荣贵，官运旺盛，中年成功隆昌，环境良好。\n18 谟 水：清雅荣贵，多才贤能，中年成功隆昌，荣贵之字。\n18 蹒 水：外祥内苦，晚婚迟得子吉，中年多灾，晚年吉祥。\n18 濮 水：智勇双全，学问丰富，中年成功隆昌，官运旺盛，出国富贵之字。\n18 湿 水：身弱短寿，忧心劳神，一贫如洗，多灾难，欠子之字。\n18 涛 水：身瘦多才，清雅荣贵，中年吉祥，环境良好，晚年劳神。\n18 隙 水：出外逢贵得财，晚婚大吉，中年吉祥，晚年隆昌，官旺之字。\n18 滢 水：口快性刚，清雅多才，中年劳，晚年隆昌。\n18 杂 水：英俊才人，上下敦睦，一生荣幸多才，中年劳，晚年吉祥。\n18 虫 火：一生清雅平凡，保守之格，聪明才干，中年困苦，晚福之字。\n18 戴 火：出外逢贵得财，克己助人，中年劳，晚年成功隆昌。\n18 焘 火：学识渊博，官运旺，中年成功隆昌，出国之字，环境良好。\n18 断 火：有爱情烦恼，忌车怕水，病弱短寿，中年多灾，晚年吉祥。\n18 丰 火：多才巧智，清秀伶俐，中年成功隆昌，幸福荣贵之字。\n18 烬 火：忧心劳神，病弱短寿，忌车怕水，多灾难，女人守寡。\n18 礼 火：清雅伶俐，刑偶欠子，中年吉祥，晚年隆昌，双妻之格。\n18 鲤 火：福禄双收，名利有份，一生温和贤能，中年成功隆昌，幸福之字。\n18 粮 火：义利分明，克己助人，中年平凡，晚年吉祥，荣幸之字。\n18 适 火：刑偶欠子，身弱多病，出外吉祥，中年隆昌，晚年劳神。\n18 题 火：出外成功隆昌，自在快乐，中年平，晚年隆昌，环境良好。\n18 曜 火：多才勤俭，贤能忠厚，中年平，晚年隆昌，环境良好。\n18 瞻 火：福禄双收，少年艰难，中年劳或奔波，晚年吉祥。\n18 职 火：晚婚迟得子吉，天生聪颖，中年劳，晚年吉祥，短寿之字。\n18 转 火：忧心劳神，事劳无功，中年劳，刑偶伤子，晚年吉祥。\n18 础 土：命硬，出外成功，中年劳或奔波，晚年成功隆昌，刑偶伤子。\n18 垒 土：忧心劳神，外祥内苦，小心爱情厄，中年多灾，晚年吉祥。\n18 医 土：一生清雅多才，清雅贤能，中年劳，晚年隆昌，\n18 陨 土：智勇双全，聪明伶俐，二子吉祥，中年平凡，晚年吉祥。\n19 镖 金：清雅荣贵，环境良好，刑偶伤子，中年吉祥，晚年劳神。\n19 宠 金：清雅多才，秀气荣贵，中年吉祥，女人刑偶伤子。\n19 畴 金：学问丰富，清雅荣贵，中年成功隆昌，官运旺，出国之字。\n19 辞 金：清雅多才，秀气伶俐，中年劳，勤俭持家，晚年吉祥。\n19 祷 金：温和多才，清雅荣贵，身弱多病，中年劳，晚年隆昌，官运旺。\n19 颠 金：秀气英敏，天生伶俐，二子吉祥，中年成功隆昌，出国荣幸。\n19 镜 金：多才贤能，出外吉祥，官运旺，荣贵隆昌，环境良好。\n19 铿 金：操守廉正，清雅荣贵，官运旺，中年成功隆昌，出国之字。\n19 迁 金：刑偶伤子，清雅多才，中年潦倒，晚年吉祥。\n19 锵 金：命硬，无父母缘，病弱短寿，中年吉祥，环境良好，忌车怕水。\n19 鹊 金：理智充足，刑偶伤子，晚婚吉祥，中年劳，晚年隆昌。\n19 绳 金：不祥之字，多灾难，一贫如洗，刑偶短寿，难幸福。\n19 识 金：刑偶伤子，清雅荣贵，中年吉祥，晚年隆昌，环境良好。\n19 兽 金：性刚口快，杀人被杀，有牢狱之灾，恶死凶亡，不祥之字。\n19 系 金：有爱情厄，温和诚实，清雅秀气，中年劳，晚年吉祥。\n19 选 金：刑偶伤子，清雅伶俐，出外吉祥，中年奔波，晚年隆昌，女人不幸。\n19 赞 金：清雅荣贵，刑偶伤子，晚婚大吉，中年劳，晚年隆昌。\n19 遵 金：出外吉祥，温和多才，勤俭治家，晚年吉祥，环境良好。\n19 关 木：刑偶伤子，晚婚迟得子吉，中年劳，晚年吉祥，欠子之字。\n19 鲸 木：温和贤淑，勤俭善良，一世安然，中年成功隆昌，环境良好。\n19 旷 木：理智充足，二子吉祥，荣贵隆昌，环境良好。\n19 麓 木：名利双收，重信用，中年劳，自成家业，白手成家。\n19 难 木：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n19 攀 木：有爱情烦恼，刑偶伤子，多灾难，再嫁守寡之字。\n19 麒 木：学识渊博，智勇双全，一生荣贵隆昌，二子吉祥，官旺富贵。\n19 签 木：忧心劳神，身弱短寿，中年多灾，晚年吉祥但多病。\n19 薇 木：秀气多才，清雅伶俐，出外吉祥，中年平，晚年隆昌。\n19 萧 木：秀气多能，清雅伶俐，中年劳，晚年吉祥。\n19 肖 木：刑偶伤子，事劳无功，中年多灾，晚年隆昌，欠子之字。\n19 撷 木：智勇双全，克己助人，中年劳或有爱情厄，晚年吉祥。\n19 蟹 木：智勇双全，一生多才贤能，中年劳，晚年吉祥。\n19 遗 木：有才能理智，难遇知己，出外吉祥，中年有灾，晚年安详。\n19 蚁 木：温和贤能，清雅多才，刑偶伤子，晚年吉祥。\n19 羹 水：智勇双全，多才清雅，中年成功隆昌，晚年劳神。\n19 绘 水：多才贤能，温和贤淑，晚婚大吉，早婚多灾，中年劳，晚年吉祥。\n19 猎 水：多愁多忧，百事劳苦，中年多灾或潦倒，晚年吉祥。\n19 泺 水：自在乐天，自成家业，中年劳或奔波，晚年吉祥。\n19 靡 水：忧心劳神，刑偶伤子，中年劳或有爱情烦恼，晚年吉祥。\n19 鹏 水：性刚果断，身弱多病，中年劳，武官大吉，晚年隆昌，官运旺。\n19 谱 水：晚婚迟得子大吉，清雅荣贵，中年吉祥，晚年隆昌，荣贵之字。\n19 雾 水：带刀厄，忧心劳神，刑偶伤子，中年劳，晚年吉祥，荣幸之字。\n19 齑 火：学识渊博，善良多才，名利双收，福禄永在，荣贵之字。\n19 际 火：忠厚善良，谋为出众，中年吉祥，晚年劳神，二子吉祥。\n19 羸 火：清雅伶俐，多才巧智，刑偶伤子，晚年吉祥。\n19 类 火：清雅伶俐，二子吉祥，中年劳，晚年吉祥，肯做肯劳。\n19 离 火：不祥之字，多灾难，刑偶伤子，事劳无功，病弱短寿。\n19 丽 火：清秀多才，妻贤子贵，中年平凡，女人小心爱情厄，忌车怕水。\n19 龄 火：慈祥有德，温和贤淑，清雅荣贵，中年劳，晚年隆昌。\n19 谭 火：温和贤能，英敏清雅，中年吉祥隆昌，晚年劳神。\n19 韬 火：多才贤能，清雅多才，中年吉祥，晚年隆昌，官运旺。\n19 玺 火：精明公正，义利分明，智勇双全，中年成功隆昌，官运旺，出国之格。\n19 绎 火：天生聪颖，小心爱情厄，中年劳，晚年吉祥，但劳神多病。\n19 赠 火：英敏多才，清雅荣贵，中年成功隆昌，环境良好，晚婚大吉。\n19 辙 火：出国之格，多才伶俐，清雅荣贵，中年成功隆昌，官运旺。\n19 稳 土：一生清雅伶俐，早婚不宜，中年劳，晚年吉祥，女人再嫁守寡之字。\n19 韵 土：小心爱情厄，二子吉祥，中年有灾，晚婚平安，晚年吉祥。\n20 镡 金：清雅多才，一生中年平凡，晚年隆昌，刑偶伤子。\n20 触 金：性刚果断，英雄之格，杀人被杀，身弱短寿，忌车怕水。\n20 镫 金：身瘦多才，清雅荣贵，中年吉祥，晚年隆昌，环境良好。\n20 锏 金：多才贤能，荣贵隆昌，晚婚大吉，中年劳，晚年吉祥。\n20 镪 金：智勇双全，义利分明，中年平凡但奔波，晚年隆昌，官运旺。\n20 释 金：一生清雅荣贵，智勇双全，中年平凡，晚年吉祥。\n20 馨 金：秀气多才，精明公正，中年成功隆昌，小心爱情厄。\n20 续 金：二子吉祥，清雅温和，多才伶俐，中年吉祥，环境良好，晚年多病。\n20 译 金：一生清闲量大，上下敦睦，爱人所爱，中年吉祥，晚年隆昌。\n20 钟 金：一生清雅多才，克己助人，中年平凡，晚年隆昌。\n20 藏 木：温和清雅，多才贤能，出外吉祥，中年劳，晚年隆昌。\n20 筹 木：多才贤能，清雅伶俐，中年吉祥，身弱多病，晚年隆昌。\n20 篡 木：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n20 籍 木：晚婚迟得子吉，白手成家，自力更生，中年勤俭，晚年隆昌。\n20 继 木：胆识丰富，精明公正，中年成功隆昌，出国之字，小心爱情厄。\n20 舰 木：性刚果断，多才贤能，中年劳，晚年吉祥，环境良好。\n20 警 木：福禄双收，贵人明现，重情失败，中年劳，晚年吉祥。\n20 竞 木：出外吉祥，父母无缘，刑偶伤子，忌车怕水，晚年吉祥。\n20 觉 木：刑偶欠子，性刚口快，中年吉祥，晚年隆昌，出外吉祥。\n20 阚 木：性刚果断，忌车怕水，中年多灾，晚年吉祥。\n20 篮 木：一生清雅伶俐，理智充足，刑偶或伤子，中年劳，晚年吉祥。\n20 琼 木：秀气贤能，二子吉祥，中年成功隆昌，出国之格，小心爱情厄。\n20 劝 木：刑克父母，中年劳，晚年吉祥，女人多灾。\n20 牺 木：多才贤能，温和伶俐，中年平凡，晚年吉祥，环境良好，忌车怕水。\n20 献 木：清雅荣贵，官或财旺，中年成功隆昌，环境良好，晚年劳神。\n20 悬 木：忧心劳神，刑偶伤子，身弱短寿，中年劳苦，晚年吉祥。\n20 薰 木：衣厚食丰，秀气巧妙，清雅荣贵，官运旺，出国之字。\n20 严 木：智勇双全，忠厚善良，事业如意，官运旺，成功隆昌，荣贵之字。\n20 邀 木：奔波劳苦，事劳无功，中年多灾，晚年吉祥。\n20 议 木：英雄格，多才贤能，白手成家，快乐自在，晚年隆昌。\n20 怀 水：浮沉不定，机谋多变，刑偶伤子，晚婚大吉，中年劳，小心爱情厄，出国之格。\n20 还 水：奔波劳苦，出外逢贵得财，刑偶伤子，中年劳，晚年吉祥。\n20 迈 水：少年艰难，出外逢贵得财，中年劳，晚年隆昌，官运旺。\n20 颟 水：外祥内苦，刑偶伤子，中年多劳，晚年吉祥，二子幸福。\n20 瀜 水：清雅多才，温和伶俐，中年劳，晚年吉祥，女人有爱情烦恼。\n20 宝 火：忧心劳神，忌车怕水，中年吉祥，晚年劳神，二子吉祥。\n20 阐 火：孤独格，清雅伶俐，福禄双收，中年劳，晚年吉祥，忌车怕水。\n20 党 火：多才贤能，理智充足，中年平凡，保守之字，女人有爱情厄。\n20 窦 火：一生清雅荣贵，精明公正，刑偶伤子，中年劳，晚年隆昌。\n20 炉 火：谋为出众，福禄双收，中年吉祥，刑偶伤子，晚年隆昌。\n20 飘 火 ：刑偶伤子，福禄双收，中年吉祥，环境良好，晚年劳神，多疾双妻。\n20 赡 火：福禄双收，特有人缘，中年劳，晚年吉祥。\n20 獭 火：晚婚迟得子吉，肯做肯劳，重信用，中年吉祥，晚年劳神。\n20 腾 火：出外逢贵得财，一生清雅，中年劳苦，晚年吉祥。\n20 耀 火：天生聪颖，清雅荣贵，多才贤能，中年成功隆昌，出国之格。\n20 矿 土：命硬，晚婚吉祥，二子吉祥，中年吉祥，环境良好。\n20 砾 土：忧心劳神，身弱多疾，刑偶或伤子，中年劳，晚年吉祥。\n20 壤 土：晚婚迟得子吉，早婚半途，出外吉祥，中年劳苦，怀才不遇。\n21 衬 金：小心爱情厄，出外吉祥，中年劳苦，晚年吉祥。\n21 铎 金：官运财旺，一生优裕，中年平凡，晚年隆昌，环境良好之字。\n21 镌 金：刑偶伤子，身弱多病，外祥内苦，中年劳，晚年吉祥。\n21 镰 金：清雅荣贵，多才贤能，中年吉祥，晚年隆昌，出国之格。\n21 随 金：忧心劳神，事劳无功，外祥内苦，中年多灾，晚年吉祥。\n21 铁 金：刑偶伤子，一生清雅，中年吉祥，晚年劳神多病。\n21 属 金：忧心劳神，事劳无功，早婚不宜，中年劳，晚年吉祥。\n21 顾 木：一生清雅荣贵，理智充足，中年劳，晚年吉祥。\n21 颢 木：精明公正，操守廉正，中年成功隆昌，官或财旺，出国之字。\n21 鸡 木：忌车怕水，一生清雅平凡，中年劳，晚年吉祥。\n21 茧 木：伶俐多才，温和贤淑，中年吉祥，晚年隆昌，出国之字。\n21 驱 木：理智充足，清雅伶俐，中年劳苦或潦倒，晚年吉祥。\n21 饶 木：多才贤能，清雅伶俐，出外逢贵得财，刑偶伤子，官旺之字。\n21 藤 木：身弱多疾，义利分明，名利双收，中年劳，晚年吉祥。\n21 嚣 木：口快心直，上下敦睦，小心爱情厄，中年劳，晚年吉祥。\n21 药 木：外祥内苦，中年多灾，晚年吉祥，不祥之字。\n21 艺 木：有才能理智，温和贤能，中年吉祥，晚年隆昌，出国之字。\n21 龈 木：性刚口快，身弱短寿，中年劳苦，晚年吉祥。\n21 莺 木：秀气伶俐，多才贤淑，出外吉祥，中年劳，晚年隆昌，刑偶伤子。\n21 樱 木：秀气伶俐，清雅伶俐，小心爱情厄，中年劳，晚年隆昌，环境良好。\n21 黯 水：不祥之字，暗淡无光，身弱短寿，中年多灾，晚年劳神。\n21 霸 水：刑偶欠子，晚婚大吉，中年离乱，成功隆昌，环境良好，双妻之格。\n21 辩 水：福禄双收，一生清雅荣贵，保守平凡，环境良好。\n21 鹤 水：安详自乐，中年吉祥，晚年隆昌，劳神多疾。\n21 轰 水：晚婚大吉，清雅多才，中年成功隆昌，出国之格。\n21 护 水：刑偶欠子，晚婚大吉，出外吉祥，中年有灾，晚年隆昌。\n21 澜 水：事劳无功，刑偶伤子，有爱情厄，病弱短寿。\n21 露 水：秀气伶俐，福禄双收，小心爱情厄，中年平凡，晚年隆昌。\n21 霹 水：多才贤能，智勇双全，中年平凡，晚年隆昌，出国之字。\n21 缠 火：秀气巧妙，刑偶伤子，身弱多病，中年吉祥，晚年劳神。\n21 跻 火：清秀英俊，中年成功隆昌，官运旺，晚年劳神。\n21 蜡 火：忧心劳神，事劳无功，孤掌难鸣，中年劳苦，晚年吉祥。\n21 览 火：忧心劳神，奔波劳苦，有爱情厄，中年劳，晚年吉祥。\n21 累 火：忌车怕水，中年劳，晚年隆昌，女人多劳。\n21 灶 火：环境良好，清雅多才，双妻之格，中年劳，成功隆昌，忠厚善良。\n21 馔 火：刑偶伤子，一生清雅多才，中年劳苦，晚年吉祥。\n21 蠡 土：忧心劳神，事劳无功，有才能理智，中年劳，晚年吉祥。\n21 巍 土：清雅伶俐，英敏豪杰，中年劳，晚年吉祥，女人身弱短寿。\n21 誉 土：福禄双收，官运旺，白手起家，晚年隆昌，环境良好。\n21 跃 土：清雅荣贵，福禄双收，中年吉祥，晚年隆昌，环境良好。\n22 鉴 金：精明公正，忠厚善良，中年成功隆昌，富贵之字。\n22 癣 金：忧心劳神，事劳无功，多灾难，难得幸福，不祥之字。\n22 铸 金：精明公正，忠厚善良，荣贵隆昌，身弱短寿。\n22 笼 木：忧心劳神，刑偶伤子，晚婚大吉，中年劳，晚年吉祥。\n22 苹 木：秀气伶俐，多才巧智，中年劳或奔波，晚年吉祥隆昌。\n22 权 木：清雅荣贵，学问丰富，官运旺，中年成功，晚年劳神。\n22 苏 木：天生聪颖，多才贤能，中年劳，晚年吉祥隆昌。\n22 俨 木：多愁善感，性刚口快，出外吉祥，中年劳，晚年吉祥。\n22 沣 水：多才贤能，清雅伶俐，中年吉祥，晚年隆昌，白手成家。\n22 灌 水：刑偶伤子，二子吉祥，清雅荣贵，中年吉祥，环境良好。\n22 骅 水：多才能干，清雅伶俐，中年成功隆昌，出国之字。\n22 欢 水：刑偶伤子，二子吉祥，清雅荣贵，中年成功隆昌，环境良好。\n22 霁 水：春风得意，一生清雅优裕，官运旺，环境良好。\n22 鳗 水：秀气巧妙，清雅多才，中年吉祥，晚年隆昌。\n22 穰 水：出外吉祥，福禄双收，温和荣贵，中年平，晚年隆昌。\n22 响 水：性刚果断，身弱短寿，中年多灾，忌车怕水，不祥之字。\n22 藻 水：清雅多才，温和伶俐，官运旺，中年多劳，晚年吉祥。\n22 颤 火：清雅多才，环境良好，中年吉祥，晚年隆昌，二子吉祥。\n22 籴 火：一生安稳守己，清雅伶俐，中年吉祥，晚年劳神。\n22 叠 火：忧心劳神，身弱多病，中年多灾，晚年吉祥。\n22 读 火：出外贵人明现，义利分明，官运旺，中年成功隆昌，富贵之字。\n22 赎 火：一生平凡保守，中年劳，刑偶伤子，晚年多病。\n22 龛 火：性刚果断，克父命，晚婚吉，刑偶伤子，中年劳，晚年吉祥。\n22 摄 火：清雅多才，晚婚大吉，中年劳或奔波，晚年吉祥。\n22 听 火：性刚口快，父母无缘，中年多灾，晚年吉祥。\n22 巅 土：有才能理智，中年劳，晚年成功隆昌，出国之字。\n22 懿 土：智勇双全，操守廉正，清雅荣贵，官运旺，富贵之字。\n22 隐 土：忧心劳神，事劳无功，中年离乱，再嫁守寡，晚年吉祥。\n22 璎 土：清秀聪慧，一生温和贤淑，二子吉祥，小心爱情厄，晚年隆昌，出国之字。\n23 镳 金：天生聪颖，精明公正，清雅荣贵，官或财旺，环境良好。\n23 銎 金：清雅荣贵，学识渊博，安富尊荣，中年成功隆昌，享福之字。\n23 铄 金：秀气伶俐，义利分明，中年平凡，晚年隆昌，环境良好。\n23 攒 金：刑偶伤子，清雅伶俐，中年劳，晚年吉祥。\n23 鳜 木：生平刚直，出外吉祥，福禄双收，中年吉祥，晚年劳神。\n23 兰 木：多才贤能，中年劳，晚年隆昌，女人有爱情厄，身弱短寿，忌车怕水。\n23 验 木：怀才不遇，事劳无功，中年多劳，晚年吉祥。\n23 驿 木：忧心劳神，身弱短寿，虽成功隆昌，难得幸福。\n23 变 水：智勇双全，义利分明，出外吉祥，中年成功隆昌，出国之格。\n23 鳞 火：精明公正，多才清雅，中年成功隆昌，官运旺，荣贵出国。\n23 麟 火：操守廉正，清雅荣贵，官运旺，中年成功隆昌，出国之格。\n23 恋 火：忧心劳神，有爱情厄，晚年吉祥。\n23 栾 火：忧心劳神，损丁破财，身弱短寿，难幸福。\n23 体 火：忧心劳神，事劳无功，中年多灾，晚年吉祥。\n23 显 火：胆识丰富，多才贤能，二子吉祥，晚年劳神。\n23 娈 土：刑偶伤子，出外吉祥，中年多灾，忌车怕水。\n23 岩 土：身犯破，性刚口快，内心慈祥，出外吉祥，福禄之字。\n23 缨 土：秀气多才，清雅伶俐，小心爱情厄，中年平，晚年吉祥。\n24 鑫 金：英俊人才，特有人缘，荣贵吉祥，官运旺，环境良好。\n24 霭 木：谋为出众，福禄双收，贵人明现，中年吉祥，晚年隆昌。\n24 赣 木：少年艰难，中年吉祥隆昌，晚年劳神，短寿之字。\n24 羁 木：刑偶欠子，晚婚大吉，中年有离乱之灾，晚年隆昌。\n24 搅 木：出外逢贵得财，中年奔波劳苦，忌车怕水，晚年吉祥。\n24 篱 木：不祥之字，忧心劳神，多灾难，刑偶伤子，一贫如洗。\n24 酿 木：清雅伶俐，贤能勤俭，出外吉祥，中年平凡，晚年吉祥。\n24 鹰 木：性刚口快，少年艰难，中年平凡，晚年吉祥，子孙兴旺。\n24 灵 火：精明公正，义利分明，中年成功隆昌，名利双收，环境良好。\n24 雳 火：刑偶伤子，身弱多病，中年劳，晚年吉祥昌盛。\n24 鹭 火：秀气伶俐，温和贤能，中年成功隆昌，晚年劳神。\n24 让 火：福禄双收，出外吉祥，中年平凡，晚年隆昌，环境良好。\n24 罐 土：有才能理智，福禄双收，中年劳，晚年隆昌。\n24 盐 土：兄弟无缘，出外吉祥，中年多灾，晚年隆昌，带血之字。\n24 艳 土：秀气伶俐，多才贤能，中年吉祥，小心爱情厄，晚年隆昌。\n25 观 木：口快心直，沉静清秀，中年劳，晚年吉祥。\n25 缵 木：刑偶伤子，身弱多病，中年劳，晚年吉祥，女人有爱情厄，再嫁之字。\n25 灞 水：刑偶或欠子，中年吉祥，但有离乱之灾，晚年隆昌。\n25 灏 水：操守廉正，医界大吉，官运旺，中年成功隆昌，富贵之字。\n25 蛮 水：刑克父母，刑偶伤子，中年多灾，晚年吉祥。\n26 骥 金：出外吉祥，晚婚大吉，中年有灾，忌车怕水，晚年吉祥。\n26 湾 水：一生奔波，事劳无功，忌车怕水，有爱情烦恼，晚年吉祥。\n26 郦 火：秀气伶俐，天生聪颖，温和贤淑，出国之字，成功隆昌。\n26 逻 火：出外吉祥，多才贤能，小心爱情厄，中年劳，晚年吉祥。\n27 銮 金：有爱情烦恼，身弱短寿，晚年隆昌，伶俐之字。\n27 锣 金：义利分明，清雅多才，中年平凡，晚年隆昌，环境良好。\n27 钻 金：刑偶伤子，清雅多才，中年劳，晚年隆昌，环境良好。\n27 缆 火：性格复杂，多变易动，出外吉祥，沉浮不定，出外吉祥，一生无运。\n27 骧 火：多才贤能，温和贤淑，忌车怕水，少年艰难，中年劳，晚年吉祥。";
  }
});

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/n.js
var require_n = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/dict/n.js"(exports, module) {
    "use strict";
    var text = require_n_text();
    function propertiesInterval(n1, n2) {
      if (n1 > n2) {
        n1 += n2;
        n2 = n1 - n2;
        n1 -= n2;
      }
      return Math.min(n2 - n1, n1 + 5 - n2);
    }
    var names = {
      金: [],
      木: [],
      水: [],
      火: [],
      土: []
    };
    var combination2 = [];
    var combination2Max = 0;
    var combination3 = [];
    var combination3Max = 0;
    var properties = Object.keys(names);
    var dict = text.split("\n").map((line) => line.split(" ")).filter((line) => line.length > 0 && line[0] !== "");
    for (const line of dict) {
      names[line[2].split("：")[0]].push(line[1]);
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const temp = { property: properties[i] + properties[j] };
        temp.min = combination2Max;
        const interval = propertiesInterval(i, j);
        if (interval === 0) combination2Max += 100;
        if (interval === 1) combination2Max += 50;
        if (interval === 2) combination2Max += 20;
        temp.max = combination2Max - 1;
        combination2.push(temp);
      }
    }
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        let base = propertiesInterval(i, j);
        if (base === 0) base = 100;
        if (base === 1) base = 50;
        if (base === 2) base = 20;
        for (let k = 0; k < 5; k++) {
          const temp = { property: properties[i] + properties[j] + properties[k] };
          temp.min = combination3Max;
          const interval = propertiesInterval(j, k);
          if (interval === 0) combination3Max += 100;
          if (interval === 1) combination3Max += 50;
          if (interval === 2) combination3Max += 20;
          combination3Max += base;
          temp.max = combination3Max - 1;
          combination3.push(temp);
        }
      }
    }
    module.exports = {
      names,
      properties,
      combination2,
      combination2Max,
      combination3,
      combination3Max
    };
  }
});

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/lib/name.js
var require_name = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/lib/name.js"(exports) {
    "use strict";
    require_polyfill_browserify();
    var Mt19937 = require_mt19937();
    var {
      combination2,
      combination2Max,
      combination3,
      combination3Max,
      names,
      properties
    } = require_n();
    var currentSeed = Date.now();
    var random5 = new Mt19937(currentSeed++, 0, 4);
    var randoms = {};
    for (let i = 0; i < properties.length; i++) {
      const random = new Mt19937(currentSeed++, 0, names[properties[i]].length - 1);
      randoms[properties[i]] = random;
    }
    var randomCombination2 = new Mt19937(currentSeed++, 0, combination2Max - 1);
    var randomCombination3 = new Mt19937(currentSeed++, 0, combination3Max - 1);
    var random1000 = new Mt19937(currentSeed++, 0, 999);
    process.on("exit", () => {
      random5.destroy();
      randomCombination2.destroy();
      randomCombination3.destroy();
      random1000.destroy();
      for (const key in randoms) {
        if (!randoms.hasOwnProperty(key)) continue;
        randoms[key].destroy();
      }
    });
    exports.get1 = function get1(property) {
      if (void 0 === property) {
        property = properties[random5.next(5)];
      }
      const temp = names[property];
      const idx = randoms[property].next();
      return temp[idx];
    };
    exports.get2 = function get2(property) {
      if (void 0 === property) {
        const idx = randomCombination2.next();
        property = combination2.find((p) => p.min <= idx && p.max >= idx).property;
      }
      return exports.get1(property[0]) + exports.get1(property[1]);
    };
    exports.get3 = function get3(property) {
      if (void 0 === property) {
        const idx = randomCombination3.next();
        property = combination3.find((p) => p.min <= idx && p.max >= idx).property;
      }
      return exports.get2(property.substr(0, 2)) + exports.get1(property[2]);
    };
    exports.get = function get() {
      const temp = random1000.next();
      if (temp <= 475) return exports.get1();
      if (temp <= 950) return exports.get2();
      return exports.get3();
    };
    exports.dict = names;
  }
});

// node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/random.js
var require_random = __commonJS({
  "node_modules/.pnpm/chinese-random-name@2.0.1/node_modules/chinese-random-name/random.js"(exports) {
    var surnames = require_surname();
    var names = require_name();
    exports.surnames = surnames;
    exports.names = names;
    exports.generate = function(len) {
      let surname, name;
      if (void 0 === len) {
        surname = surnames.getOne();
        name = names.get();
      } else if (len === 2) {
        do {
          surname = surnames.getOne();
        } while (surname.length !== 1);
        name = names.get1();
      } else if (len === 3) {
        do {
          surname = surnames.getOne();
        } while (surname.length > 2);
        if (surname.length === 1) name = names.get2();
        if (surname.length === 2) name = names.get1();
      } else if (len === 4) {
        do {
          surname = surnames.getOne();
        } while (surname.length > 3);
        if (surname.length === 1) name = names.get3();
        if (surname.length === 2) name = names.get2();
        if (surname.length === 3) name = names.get1();
      }
      const n = surname + name;
      return n;
    };
  }
});
export default require_random();
//# sourceMappingURL=chinese-random-name.js.map
