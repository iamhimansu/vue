<script>
import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code'
import Paragraph from '@editorjs/paragraph'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Checklist from '@editorjs/checklist'
import Marker from '@editorjs/marker'
import Warning from '@editorjs/warning'
import RawTool from '@editorjs/raw'
import Quote from '@editorjs/quote'
import InlineCode from '@editorjs/inline-code'
import Delimiter from '@editorjs/delimiter'
import NestedList from '@editorjs/nested-list'
import TextVariant from '@editorjs/text-variant-tune'
import Article from "@/pages/js/Article";
import {mapGetters} from "vuex";
import ErrorSummary from "@/components/ErrorSummary.vue";

export default {
  name: "EditorJsLayout",
  components: {ErrorSummary},
  data() {
    return {
      editorInstance: null,
      title: '',
      errors: []
    }

  },
  computed: {
    ...mapGetters(['getDB'])
  },
  methods: {
    editor: () => {
      return new EditorJS({
        onPaste: (event) => {
          const clipboardData = event.clipboardData || window.clipboardData;
          if (clipboardData) {
            // Process and sanitize the pastedText as needed
            return clipboardData.getData('text/plain');
          }
        },
        holder: 'editor',
        placeholder: 'Let\'s write an awesome story!',
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: {
          header: {
            class: Header,
            inlineToolbar: true
          },
          list: {
            class: List,
            inlineToolbar: true
          },
          code: {
            class: CodeTool,
          },
          paragraph: {
            class: Paragraph,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                imgur: true
              }
            }
          },
          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          checklist: {
            class: Checklist,
          },
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
              titlePlaceholder: 'Title',
              messagePlaceholder: 'Message',
            },
          },
          raw: RawTool,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
          inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+M',
          },
          delimiter: Delimiter,
          textVariant: TextVariant,
          nested: {
            class: NestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            },
          },
        },
        tunes: ['textVariant'],
        data: {

        }
      });
    },
    invokeSave() {
      this.editorInstance.save()
          .then((data) => {
            const ArticleObject = {
              title: this.title,
              json_content: JSON.stringify(data),
            };
            const ArticleModel = new Article(ArticleObject, this.getDB);
            this.errors = ArticleModel.collectErrors();
            ArticleModel.save();
            console.log(this.errors)
            // Do what you want with the data here
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })
    }
  },

  beforeMount() {
    this.editorInstance = this.editor();
  }
}
</script>

<template>
  <div class="p-8 relative">
    <div class="w-160 mx-auto">
      <error-summary :errors="errors"></error-summary>
      <input v-model="title" class="w-full p-4 px-0 text-2xl outline-0 rounded border-0" placeholder="New title" type="text">
    </div>
    <div id="editor" class="z-auto"></div>
    <button class="w-12 h-12 border bg-gray-100 hover:bg-black group fixed right-10 bottom-10 rounded-full"
            @click="invokeSave">
      <i class="bi bi-pencil text-black group-hover:text-white"></i>
    </button>

  </div>
</template>

<style scoped>

</style>