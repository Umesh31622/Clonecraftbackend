
// const express = require("express");
// const { renderCraftoVideo, getAvailableTransitions } = require("../controllers/renderCraftoController");

// const router = express.Router();

// router.post("/render-crafto", renderCraftoVideo);
// router.get("/transitions", getAvailableTransitions);

// module.exports = router;
const express = require("express");
const {
  renderCraftoVideo,
  getAvailableTransitions,
  addOverlayAnimation
} = require("../controllers/renderCraftoController");

const router = express.Router();

// Main render route
router.post("/render-crafto", renderCraftoVideo);

// Transitions list route
router.get("/transitions", getAvailableTransitions);

// Overlay animation route
router.post("/overlay-animation", addOverlayAnimation);

module.exports = router;
