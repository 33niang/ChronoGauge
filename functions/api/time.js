/**
 * API aunction to return the current server time.
 * Cloudflare Pages will automatically route requests from /api/time to this function.
 */
export async function onRequest(context) {
  // 核心逻辑：返回当前服务器的 UTC 时间戳
  const data = {
    serverTime: Date.now()
  };

  // 创建一个 JSON 响应。
  // 因为这个函数和前端页面部署在同一个域名下，所以不需要设置复杂的 CORS 跨域头。
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
}
