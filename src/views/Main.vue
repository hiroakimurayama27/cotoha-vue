<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" @click="show('Main')">Cotoha Vue</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" :class="{'active': isShow('Parse')}">
            <a class="nav-link"  @click="show('Parse')">構文解析</a>
          </li>
          <li class="nav-item" :class="{'active': isShow('Ne') == true}">
            <a class="nav-link" @click="show('Ne')">固有表現抽出</a>
          </li>
          <li class="nav-item" :class="{'active': isShow('Coreference') == true}">
            <a class="nav-link" @click="show('Coreference')">照応解析</a>
          </li>
          <li class="nav-item" :class="{'active': isShow('Keyword') == true}">
            <a class="nav-link" @click="show('Keyword')">キーワード抽出</a>
          </li>
          <li class="nav-item" :class="{'active': isShow('Similarity') == true}">
            <a class="nav-link" @click="show('Similarity')">類似度算出</a>
          </li>
          <li class="nav-item" :class="{'active': isShow('SentenceType') == true}">
            <a class="nav-link" @click="show('SentenceType')">文タイプ判定</a>
          </li>
          <li class="nav-item" :class="{'active': isShow('Sentiment') == true}">
            <a class="nav-link" @click="show('Sentiment')">感情分析</a>
          </li>
          
        </ul>
      </div>
    </nav>

    <div class="col-sm-12 mt-5" v-show="isShow('Main')">
      <div class="form-group row">
        <span class="offset-3 col-sm-2">client_id</span>
        <input type="tel" class="form-control col-sm-3" v-model="client_id">
      </div>
      <div class="form-group row">
        <span class="offset-3 col-sm-2">client_secret</span>
        <input type="tel" class="form-control col-sm-3" v-model="client_secret">
      </div>
      <div class="form-group row">
        <button class="btn btn-primary offset-5 col-sm-1" @click="getToken">実行</button>
      </div>
      <div class="form-group row">
        <span class="offset-3 col-sm-2">access_token</span>
        <input type="tel" class="form-control col-sm-3" v-model="access_token">
      </div>
    </div>

    <Parse v-show="isShow('Parse')" :accessToken="access_token"></Parse>
    <Ne v-show="isShow('Ne')" :accessToken="access_token"></Ne>
    <Coreference v-show="isShow('Coreference')" :accessToken="access_token"></Coreference>
    <Keyword v-show="isShow('Keyword')" :accessToken="access_token"></Keyword>
    <Similarity v-show="isShow('Similarity')" :accessToken="access_token"></Similarity>
    <SentenceType v-show="isShow('SentenceType')" :accessToken="access_token"></SentenceType>
    <Sentiment v-show="isShow('Sentiment')" :accessToken="access_token"></Sentiment>

  </div>
</template>

<script>

import cotoha from '../mixins/cotoha'
import Parse from './Parse'
import Sentiment from './Sentiment'
import Ne from './Ne'
import Coreference from './Coreference'
import Keyword from './Keyword'
import Similarity from './Similarity'
import SentenceType from './SentenceType'

export default {
  name: 'Main',
  mixins: [cotoha],
  components: {
     Parse
    ,Sentiment
    ,Ne
    ,Coreference
    ,Keyword
    ,Similarity
    ,SentenceType
  },
  data() {
    return {
      actions: {
        'Main': true,
        'Parse': false,
        'Sentiment': false,
        'Ne': false,
        'Coreference': false,
        'Keyword': false,
        'Similarity': false,
      },
    }
  },
  mounted() {
    this.getAccessToken();
  },
  methods: {
    show(action) {
      for (let key in this.actions) {
        this.actions[key] = false;
      }
      this.actions[action] = true;
    },
    isShow(action) {
      return this.actions[action];
    },
    getToken() {
      this.getAccessToken();
    }

  }
}
</script>
