#include "node_api.h"

static napi_value get_answer(napi_env env, napi_callback_info info) {
    napi_value result;
    napi_create_int32(env, 42, &result);
    return result;
}

static napi_value init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, "getAnswer", NAPI_AUTO_LENGTH,
                         get_answer, NULL, &fn);
    napi_set_named_property(env, exports, "getAnswer", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)
