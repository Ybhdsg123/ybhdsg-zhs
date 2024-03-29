import { prefix } from './utils';
var styleEl = null;
export var addCss = function () {
    var cssText = '';
    cssText += ".".concat(prefix, "highlight-el{\n    position:absolute;\n  }");
    cssText += "\n   .".concat(prefix, "info-el {\n       position: absolute;\n       min-width: 250px;\n       max-width: 300px;\n   }\n\n   .").concat(prefix, "info-el-header {\n       display: flex;\n       align-items: center;\n       justify-content: space-between;\n   }\n\n   .").concat(prefix, "info-el-title {\n       font-size: 18px;\n       margin: 0;\n       padding: 0;\n       font-weight: 700;\n   }\n\n   .").concat(prefix, "info-el-close {\n       cursor: pointer;\n       color: #616161;\n       font-size: 22px;\n       font-weight: 700;\n   }\n\n   .").concat(prefix, "info-el-info {\n       padding: 15px 0;\n   }\n\n   .").concat(prefix, "info-el-info-img {\n       width: 100%;\n   }\n\n   .").concat(prefix, "info-el-info-text {\n\n   }\n\n   .").concat(prefix, "info-el-indicator {\n       display: flex;\n       align-items: center;\n       justify-content: center;\n       margin-bottom: 10px;\n   }\n\n   \n   .").concat(prefix, "info-el-indicator-item {\n       width: 6px;\n       height: 6px;\n       background: #ccc;\n       transition: width .1s ease-in;\n       border-radius: 10px;\n       cursor: pointer;\n       margin: 0 2px;\n   }\n\n   .").concat(prefix, "info-el-indicator-item.active, .").concat(prefix, "info-el-indicator-item:hover {\n       width: 15px;\n       background: #999;\n   }\n\n   .").concat(prefix, "info-el-btn-group {\n       display: flex;\n       align-items: center;\n       justify-content: space-between;\n       border-top: 1px solid #e0e0e0;\n       padding-top: 10px;\n   }\n\n   .").concat(prefix, "info-el-btn {\n       width: 60px;\n       height: 35px;\n       display: flex;\n       align-items: center;\n       justify-content: center;\n       border: 1px solid #bdbdbd;\n       text-shadow: 1px 1px 0 #fff;\n       font-size: 14px;\n       color: #424242;\n       white-space: nowrap;\n       cursor: pointer;\n       background-color: #f4f4f4;\n       border-radius: 3px;\n   }\n\n   .").concat(prefix, "info-el-btn.disabled {\n       color: #9e9e9e;\n       border-color: #bdbdbd;\n       cursor: default;\n       background-color: #f4f4f4;\n   }\n\n   .").concat(prefix, "info-el-btn:hover {\n       border-color: #9e9e9e;\n       background-color: #e0e0e0;\n       color: #212121;\n   }\n\n   .").concat(prefix, "info-el-btn.disabled:hover {\n       color: #9e9e9e;\n       border-color: #bdbdbd;\n       cursor: default;\n       background-color: #f4f4f4;\n   }\n");
    styleEl = document.createElement('style');
    styleEl.innerHTML = cssText;
    document.head.appendChild(styleEl);
};
export var removeCss = function () {
    if (styleEl) {
        document.head.removeChild(styleEl);
    }
};
