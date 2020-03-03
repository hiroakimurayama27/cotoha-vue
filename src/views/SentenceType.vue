<template>
  <div>
    <div class="col-sm-12 mt-5">
      <div class="form-group row">
        <input type="text" class="form-control offset-3 col-sm-6" v-model="sentence">
      </div>
      <div class="form-group row">
        <span class="offset-3 col-sm-2">type</span>
        <select class="form-control col-sm-4" v-model="req_type">
          <option v-for="(value, index) in type" :key="index">{{value}}</option>
        </select>
      </div>
      <div class="form-group row">
        <button class="btn btn-primary offset-5 col-sm-1" @click="run">実行</button>
      </div>
      <div class="form-group row">
        <tree-view class="offset-3 col-sm-6" :data="response" :options="{maxDepth: 5}"></tree-view>
      </div>
    </div>
  </div>
</template>

<script>
import API from '../router/cotoha.api'
import cotoha from '../mixins/cotoha'

export default {
  name: 'SentenceType',
  mixins: [cotoha],
  data() {
    return {
      // リクエスト
      req_type: 'default',
      req_dic_type: [],

      type: [
        'default',      // 通常文
        'kuzure'        // SNSなどの崩れた文
      ],
    }
  },
  methods: {
    /**
     * 感情分析を行う
     */
    run() {
      if (null != this.sentence && '' != this.sentence
       && null != this.req_type && '' != this.req_type
      ){

        const data = {
          sentence: this.sentence,
          type: this.req_type,
        }

        this.post(API.COTOHA_API_SENTENCE_TYPE, data).then(res => {
            if (0 == res.data.status) {
              this.response = res.data;
            }
            else {
              console.log(res);  
            }
          },
          err => {
            console.log(err);
          });
      }
    },
  }
}
</script>
