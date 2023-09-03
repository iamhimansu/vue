<script>
import ArticleSearchBox from "@/components/ArticleSearchBox.vue";
import PeopleSuggestions from "@/components/PeopleSuggestions.vue";
import {mapGetters} from "vuex";


export default {
  name: "ArticleLists",
  components: {PeopleSuggestions, ArticleSearchBox},
  computed: {
    ...mapGetters(['getDB']),
  },
  data() {
    return {
      articleLists: [1, 2, 3, 4, 5, 6],
      userPageSize: 10,
      totalCount: 0,
      db: null,
      users: [],
    };
  },

  beforeMount() {
    const limit = this.userPageSize, offset = 10;
    this.totalRowCount();
    this.select(limit, offset)
  },

  methods: {

    totalRowCount() {
      try {
        let totalCount = 'SELECT COUNT(*) as total FROM users;';
        const total = this.getDB.prepare(totalCount);
        //
        total.step();
        this.totalCount = total.getAsObject().total;
      } catch (e) {
        // console.log(e)
      }

    },
    select(limit = 10, offset = 0) {
      // console.log(limit, offset)
      this.users = [];
      let selectUsers = `SELECT * FROM users LIMIT ? OFFSET ?`;

      //
      const stmt = this.getDB.prepare(selectUsers);
      stmt.bind([limit, offset]);
      //
      while (stmt.step()) {
        this.users.push(stmt.getAsObject());
      }
      stmt.free();
    }
  }
};
</script>
<template>
  <div class="flex flex-row">
    <div class="w-4/6 min-h-screen border-r p-8">
      <ArticleSearchBox></ArticleSearchBox>
      <div class="flex flex-row place-items-center justify-between border-b p-2 py-4 mb-6">
        <div><h2 class="font-bold">Articles</h2></div>
        <div>
          <button class="p-2 px-12 border rounded-full text-xs font-bold hover:bg-gray-100">
            <span>Following</span>
          </button>
        </div>
      </div>
      <div v-for="(article, index) in articleLists" :key="index">
        <div class="border-b flex flex-col place-items-start gap-3 mb-3 pb-4 w-full h-56">
          <div class="flex flex-row place-items-center gap-3 h-12">
            <img alt="Rounded avatar" class="w-10 h-10 rounded-full"
                 src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"/>
            <div class="flex flex-col">
              <h5 class="text-xs font-bold">User &mdash; Apr 16, 2023</h5>
              <div class="text-xs text-gray-800">Software Developer</div>
            </div>
          </div>
          <div class="article-content">
            <div class="flex flex-row w-11/12 gap-4">
              <div class="flex flex-col gap-2">
                <div class="article-title">
                  <h3 class="font-bold text-lg">8 Psychology-Based Design Hack That Will Make You A Better UX
                    Designer</h3>
                </div>
                <div class="article-description text-xs text-gray-600 line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cupiditate dicta
                  dignissimos ex repellat. Beatae blanditiis ea error eum minus. Dolore neque quisquam soluta veritatis
                  voluptates! Blanditiis, eveniet suscipit.
                </div>
              </div>
              <div class="w-2/12">
                <div class="w-40 h-24 overflow-hidden rounded bg-center bg-cover bg-no-repeat bg-black"
                     style="background-image: url('https://images.unsplash.com/photo-1693429448772-845e333e3188?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80')">
                </div>
              </div>
            </div>
          </div>
          <div class="article-readtime">
                <span class="text-[10px] bg-gray-100 p-2 px-4 rounded-full text-gray-600"><i
                    class="bi bi-clock"></i> 4 min read</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-2/6 p-8">
      <PeopleSuggestions :page-size="userPageSize" :select="select" :total-count="totalCount"
                         :users="users"></PeopleSuggestions>
    </div>
  </div>
</template>
<style scoped>

</style>