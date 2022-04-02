Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "pages/index/index",
      iconPath: "images/icon1-1.png",
      selectedIconPath: "images/icon1.png",
      text: "你的"
    }, {
      pagePath: "pages/shouye/index",
      iconPath: "images/icon0-1.png",
      selectedIconPath: "images/icon0.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})