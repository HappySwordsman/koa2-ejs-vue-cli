<template>
  <div class="poster-wrapper">
    <h1>canvas生成海报</h1>
    <div class="canvas-container">
      <canvas
        ref="PosterCanvas"
        id="poster"
        :width="499 * 3"
        :height="888 * 3"
        class="canvas-sy"
        v-show="false"
      ></canvas>
      <img class="canvas-pic" :src="canvasImgs" alt="canvas图片" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AraleQRCode from "arale-qrcode";

const bg1 = require("@/assets/images/poster4.jpg");
export default {
  name: "Poster",
  data() {
    return {
      ctx: null,
      canvasImgs: null,
    };
  },
  created() {},
  mounted() {
    this.createPoster(3);
  },
  methods: {
    // axios 获取远程的图片转blob url
    getRemotePic2BlobURL(url) {
      return axios
        .get(url, {
          responseType: "blob",
        })
        .then(({ data }) => {
          return window.URL.createObjectURL(data);
        });
    },
    // 创建image
    createdImage({ ctx, path = "", x, y, width, height, isArc }) {
      if (isArc) {
        // 生成一次快照
        ctx.save();
        ctx.beginPath();
        // 圆形的位置是以圆心为基准 圆形的半径是图片的最小尺寸，
        ctx.arc(
          x + width / 2,
          y + height / 2,
          (width > height ? height : width) / 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "transparent";
        ctx.fill();
        ctx.clip();
      }
      return new Promise((resolve) => {
        const img = new Image(width, height);
        img.onload = function () {
          ctx.drawImage(this, x, y, width, height);
          isArc && ctx.restore();
          resolve(this);
        };
        img.src = path;
      });
    },
    // 创建canvasContext
    createdCanvasRenderingContext(canvas, contextId = "2d") {
      return canvas.getContext(contextId);
    },
    // 创建二维码
    createQRCode(opts) {
      return new AraleQRCode({
        render: "svg", // 生成的类型 'svg' or 'table'
        text: "https://showtest.snkoudai.com/ywym/#/home/root/112Q0000000", // 需要生成二维码的链接
        size: 80, // 生成二维码大小
        ...opts,
      });
    },
    // 初始化
    createPoster(scale = 1) {
      const styles = window.getComputedStyle(document.querySelector("body"));
      this.$nextTick(async () => {
        const imgUrl = await this.getRemotePic2BlobURL(
          "/file-api/crop/1460642527130b15e6.png?x-oss-process=image/resize,w_120,h_120,m_fill/auto-orient,1/quality,q_100/sharpen,80/format,jpg"
        );
        const ctx = this.createdCanvasRenderingContext(this.posterCanvas);
        await this.createdImage({
          ctx,
          path: bg1,
          width: this.posterCanvas.width,
          height: this.posterCanvas.height,
          x: 0,
          y: 0,
        });
        await this.createdImage({
          ctx,
          path: imgUrl,
          width: 120 * scale,
          height: 120 * scale,
          x: this.posterCanvas.width / 2 - (120 * scale) / 2,
          y: 120 * scale,
          isArc: true,
        });
        /* start fillText */
        ctx.save();
        ctx.fillStyle = "#B08852";
        ctx.font = `bold ${24 * scale}px ${styles.fontFamily}`;
        ctx.textAlign = "center";
        ctx.fillText("大白菜", this.posterCanvas.width / 2, 275 * scale);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#15161A";
        ctx.font = `${14 * scale}px ${styles.fontFamily}`;
        ctx.textAlign = "center";
        ctx.fillText("有机农产品", this.posterCanvas.width / 2, 304 * scale);
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#725D42";
        ctx.font = `bold ${18 * scale}px ${styles.fontFamily}`;
        ctx.fillText("财险有限公司", 110 * scale, 800 * scale);
        ctx.restore();
        /* end fillText */
        ctx.drawImage(
          this.createQRCode({
            render: "canvas",
          }),
          325 * scale,
          779 * scale,
          78 * scale,
          78 * scale
        );
        /* end qrcode */
        this.canvasImgs = this.posterCanvas.toDataURL("image/jpeg");
        this.ctx = ctx;
      });
    },
  },
  computed: {
    posterCanvas() {
      return this.$refs.PosterCanvas;
    },
    posterImageBg() {
      return this.$refs.PosterImageBg;
    },
  },
};
</script>

<style scoped lang="less">
.canvas-container {
  display: flex;
  justify-content: center;
  align-items: center;

  .canvas-sy {
    border-radius: 20px;
  }

  .canvas-pic {
    width: 375px;
    height: 667px;
    border-radius: 20px;
    display: block;
    border: 0 none;
  }
}
</style>
