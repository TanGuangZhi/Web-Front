<script>
	export default {
		onLaunch: function() {
			wx.cloud.init({
				env: 'diancan-database-0fk3qml16f38db2',
				traceUser: true,
			});
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
