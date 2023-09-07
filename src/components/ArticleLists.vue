<script>
import PeopleSuggestions from "@/components/PeopleSuggestions.vue";
import {mapGetters} from "vuex";
import TopArticles from "@/components/TopArticles.vue";


export default {
  name: "ArticleLists",
  components: {TopArticles, PeopleSuggestions},
  computed: {
    ...mapGetters(['getDB']),
  },
  data() {
    return {
      topArticles: [],
      topNArticles: 4,
      userPageSize: 10,
      totalCount: 0,
      db: null,
      users: [],
      articles: [],
    };
  },

  created() {
    const limit = this.userPageSize, offset = 0;
    this.totalRowCount();
    this.select(limit, offset);
    this.findAllArticles();
    this.findTopArticles(this.topNArticles);
  },

  methods: {
    articleLink(articleId) {
      return `/article/${articleId}`;
    },
    totalRowCount() {
      try {
        let totalCount = 'SELECT COUNT(*) as total FROM core_users;';
        const total = this.getDB.prepare(totalCount);
        //
        total.step();
        this.totalCount = total.getAsObject().total;
      } catch (e) {
        // console.log(e)
      }

    },
    select(limit = 10, offset = 0) {
      this.users = [];
      let selectUsers = `SELECT * FROM core_users LIMIT ? OFFSET ?`;

      //
      const stmt = this.getDB.prepare(selectUsers);
      stmt.bind([limit, offset]);
      //
      while (stmt.step()) {
        this.users.push(stmt.getAsObject());
      }
      stmt.free();
    },
    findAllArticles(limit = 10, offset = 0) {
      //Skip top 4 articles
      const query = `SELECT * FROM articles WHERE id NOT IN (SELECT id FROM articles ORDER BY id DESC LIMIT 4) ORDER BY id DESC LIMIT ? OFFSET ?`;
      //
      const stmt = this.getDB.prepare(query);
      stmt.bind([limit, offset]);
      //
      while (stmt.step()) {
        this.articles.push(stmt.getAsObject());
      }
      stmt.free();
    },
    findTopArticles(limit = 4) {
      const query = `SELECT * FROM articles ORDER BY id DESC LIMIT ?`;
      //
      const stmt = this.getDB.prepare(query);
      stmt.bind([limit]);

      //
      while (stmt.step()) {
        this.topArticles.push(stmt.getAsObject());
      }
      stmt.free();
    },
    formatDate(timestamp) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const date = new Date(timestamp); // Convert the timestamp to milliseconds
      return date.toLocaleDateString('en-US', options);
    }
  }
};
</script>
<template>
  <div class="flex flex-col sm:flex-row divide-x">
    <div class="w-full md:w-4/6 min-h-screen p-4 md:p-12">
      <top-articles :top-articles="topArticles"></top-articles>

      <div v-for="(article, index) in articles" :key="index">
        <div class="max-w-2xl py-4 mx-auto bg-white dark:bg-gray-800 mb-5 border-b" style="cursor: auto;">
          <div class="flex items-center justify-between">
            <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{ formatDate(article.createdAt) }}</span>
            <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">JavaScript</a>
          </div>
          <div class="mt-2">
            <router-link
                :to="{ path: articleLink(article.id)}"
                class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
              {{ article.title }}
            </router-link>

            <p class="mt-2 text-gray-600 dark:text-gray-300"
               v-html="JSON.parse(article.json_content).blocks[0].data.text"></p>

          </div>
          <div class="flex items-center justify-between mt-4">
            <router-link
                :to="{ path: articleLink(article.id)}"
                class="text-blue-600 dark:text-blue-400 hover:underline">Read more ⟶
            </router-link>
            <div class="flex items-center">
              <img alt="Author Photo" class="object-cover w-10 h-10 mx-4 rounded-full sm:block"
                   src="https://avatars.githubusercontent.com/u/44632846?v=4">
              <a class="font-bold text-gray-700 cursor-pointer dark:text-gray-200">Himanshu</a>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="w-full md:w-2/6 p-4 md:p-8">
      <people-suggestions :page-size="userPageSize" :select="select" :total-count="totalCount"
                          :users="users"></people-suggestions>
    </div>
  </div>
</template>
<style scoped>

</style>