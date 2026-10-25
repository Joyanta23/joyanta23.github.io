// Mobile navigation toggle
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Slide viewer
  document.querySelectorAll(".slides").forEach(function (box) {
    var count = parseInt(box.dataset.count, 10);
    var path = box.dataset.path;
    var title = box.dataset.title || "Presentation";
    var main = box.querySelector(".slide-main");
    var counter = box.querySelector(".slide-count");
    var strip = box.querySelector(".slide-thumbs");
    var current = 1;

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    for (var i = 1; i <= count; i++) {
      var t = document.createElement("img");
      t.src = path + "thumbs/slide-" + pad(i) + ".jpg";
      t.alt = "Slide " + i;
      t.loading = "lazy";
      t.dataset.n = i;
      t.addEventListener("click", function () { show(parseInt(this.dataset.n, 10)); });
      strip.appendChild(t);
    }

    function show(n) {
      if (n < 1) n = count;
      if (n > count) n = 1;
      current = n;
      main.src = path + "slide-" + pad(n) + ".jpg";
      main.alt = title + ", slide " + n;
      counter.textContent = n + " / " + count;
      strip.querySelectorAll("img").forEach(function (im) {
        im.classList.toggle("on", parseInt(im.dataset.n, 10) === n);
      });
      var active = strip.querySelector("img.on");
      if (active) strip.scrollTo({ left: active.offsetLeft - strip.clientWidth / 2 + active.clientWidth / 2, behavior: "smooth" });
    }

    box.querySelector(".slide-prev").addEventListener("click", function () { show(current - 1); });
    box.querySelector(".slide-next").addEventListener("click", function () { show(current + 1); });
    box.tabIndex = 0;
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
    show(1);
  });
});
