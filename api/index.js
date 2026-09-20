const {
  loadDashboardData,
  renderHTML,
} = require("../scripts/dashboard-web");

module.exports = async function handler(req, res) {
  try {
    const root = process.cwd();
    const data = loadDashboardData(root);

    if (req.url === "/api/data") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end(JSON.stringify(data));
      return;
    }

    const html = renderHTML(data);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(html);
  } catch (error) {
    console.error("[ECC Vercel Dashboard]", error);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        error: "Dashboard unavailable",
        message: error.message,
      }),
    );
  }
};
