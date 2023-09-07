<script>
import {mapGetters} from "vuex";
import ArticleParser from "@/pages/js/ArticleParser";

export default {
  name: "ArticleView",
  props: {
    id: String,
  },
  computed: {
    ...mapGetters(['getDB']),
  },
  data() {
    return {
      articleId: this.id,
      article: {},
      articleContentJson: {}
    }
  },
  beforeMount() {
    this.findArticle();
  },
  methods: {
    findArticle() {
      //Skip top 4 articles
      const query = `SELECT * FROM articles WHERE id=?`;
      //
      const stmt = this.getDB.prepare(query);
      stmt.bind([this.id]);
      //
      stmt.step();
      this.article = stmt.getAsObject();
      this.getArticleJson();
      stmt.free();
    },
    getArticleJson() {
      try {
        const article = this.article;
        this.articleContentJson = JSON.parse(article.json_content);
        this.parseContent();
      } catch (e) {
        console.log(e)
      }
    },
    parseContent() {
      /*const parser = new edjsParser();
      return parser.parse(this.articleContentJson);*/
      const parser = new ArticleParser();
      return parser.parse(this.articleContentJson);
    },
    formatDate(timestamp) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(timestamp); // Convert the timestamp to milliseconds
      return date.toLocaleDateString('en-US', options);
    }
  }
}
</script>

<template>
  <div class="p-8 w-full md:w-160 lg:w-200 mx-auto article-view">
    <div>
      <h1 class="article-title my-6 mb-8 max-w-3xl font-crimson text-center">{{ article.title }}</h1>
    </div>
    <div class="my-5 flex flex-col sm:flex-row flex-wrap items-center justify-center self-center font-poppins font-medium text-sm space-x-2 ">
      <div class=""> {{ formatDate(article.createdAt) }}</div>
      <div class="scale-150">·</div>
      <div class="">Updated — November 27, 2021</div></div>
    <div v-html="parseContent()"></div>
  </div>
</template>

<style scoped>

</style>