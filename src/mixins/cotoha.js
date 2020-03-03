import config from '../config/cotoha.config'

export default {
  data() {
    return {
      // クライアントID
      client_id: null,
      // サークレット
      client_secret: null,
      // アクセストークン
      access_token: null,
      // 解析する文章
      sentence: null,
      // 構文解析結果
      response: {
        result: {},
        status: null,
        message: null,
      },
    }
  },
  props: {
    accessToken: null,
  },
  created() {
    this.client_id = config.CLIENT_ID;
    this.client_secret = config.CLIENT_SECRET;
  },
  methods: {
    /**
     * アクセストークンを取得する
     */
    getAccessToken() {
      const data = {
        grantType: 'client_credentials',
        clientId: this.client_id,
        clientSecret: this.client_secret
      }

      // アクセストークンを取得する
      this.axios.post(config.ACCESSTOKEN_URL, data)
      .then((response) => {
        if (201 == response.status) {
          this.access_token = response.data.access_token;
        }
        else {
          console.log('アクセストークンを取得に失敗しました。' + response.statusText);
        }
      })
      .catch((e) => {
        console.log('アクセストークンを取得に失敗しました。例外エラー: ' + e);
      });
    },
    /**
     * APIの実行
     */
    post(url, data) {
      var AccessToken = this.access_token;
      if (null != this.accessToken) {
        AccessToken = this.accessToken;
      }
      
      return new Promise((resolve, reject) => {
        const headers = {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${AccessToken}`,
        }

        // APIを実行
        this.axios({
          method: 'POST',
          headers: headers,
          url: config.BASE_URL + url,
          data: data
        })
        .then((response) => {
          resolve(response);
        })
        .catch((e) => {
          reject(e);
        });
      });
    },
  }
}
