const btn = document.querySelector('#btnSearch') //搜索地图
const place = document.querySelector('#place')
/**
 *初始化地图
 * @param {*} map 地图实例
 * @param {*} lng 经度
 * @param {*} lat 纬度
 */
const initMap = (map, lng = 116.404, lat = 39.915) => {
  const point = new BMap.Point(lng, lat)
  map.centerAndZoom(point, 16) // centerAndZoom 第二个参数是缩放级别
  var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }) // 左上角，添加比例尺
  var top_left_navigation = new BMap.NavigationControl() //左上角，添加默认缩放平移控件
  map.addControl(top_left_control)
  map.addControl(top_left_navigation)
  // markerTemp(point)
}

/**
 *创建导出经纬度模板
 * @param {*} info
 */
const windowInfoTemp = (info = {}) => {
  let content = `<div class="exportLng">导入经纬度</div>`
  const el = document.querySelector('#test')
  el.innerHTML = content
  const btn = document.querySelector('.exportLng')
  btn.addEventListener('click', () => {
    console.log(info)
  })
}

const markerTemp = (lng, lat, title, address) => {
  const point = new BMap.Point(lng, lat)
  const marker = new BMap.Marker(point)
  const opts = {
    width: 200, // 信息窗口宽度
    height: 100, // 信息窗口高度
    title: title, // 信息窗口标题
  }
  const infoWindow = new BMap.InfoWindow(address, opts)
  map.openInfoWindow(infoWindow, point)
  marker.addEventListener('click', function () {
    map.openInfoWindow(infoWindow, point) //开启信息窗口
  })
}

const openInfo = (ctx) => {
  // const p =
}

//构造底图时，关闭底图可点功能
var map = new BMap.Map('map-container', { enableMapClick: false }) //地图实例
map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
var myGeo = new BMap.Geocoder()
initMap(map)

/**
 * 经纬度地址正逆解
 */
btn.addEventListener('click', () => {
  if (place.value.trim()) {
    myGeo.getPoint(
      '同安区',
      function (point) {
        if (point) {
          const { lng, lat } = point
          initMap(map, lng, lat) //初始化 地图
          map.clearOverlays() //清空标注
          const local = new BMap.LocalSearch(map, {
            renderOptions: { autoViewport: true, map: map },
            //标注气泡内容创建后的回调函数
            onInfoHtmlSet(LocalResultPoi) {
              console.log(LocalResultPoi)
              const { title } = LocalResultPoi
              const _point = LocalResultPoi.point
              const { lng, lat } = _point
              myGeo.getLocation(_point, (res) => {
                const { address } = res
                markerTemp(lng, lat, title, address) //气泡创建覆盖原生
              })
            },
            //检索完成后的回调函数
            onSearchComplete(LocalResult) {},
          })

          local.search(`同安${place.value}`) //拼接区域
        }
      },
      '厦门市'
    )
  }
})
