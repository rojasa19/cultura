<template>
	<div id="editar-usuario">
		<h3>Editar usuario</h3>
		<div class="row">
			<div class="col s12">
				<div class="row">
					<div class="input-field col s6">
						<input placeholder="Ingrese nombre" type="text" class="validate" v-model="user.nombre">
					</div>
					<div class="input-field col s6">
						<input placeholder="Ingrese apellido" id="last_name" type="text" class="validate" v-model="user.apellido">
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6">
						<input placeholder="Ingrese email" id="email" type="email" class="validate" v-model="user.email">
					</div>
					<div class="input-field col s6">
						<input placeholder="Ingrese telefono" id="telefono" type="text" class="validate" v-model="user.telefono">
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6">
						<input placeholder="Ingrese edad" id="edad" type="text" class="validate" v-model="user.edad">
					</div>
				</div>
			</div>
		</div>
		<div class="container-btns">
			<router-link :to="{name: 'view-user', params: {email: $route.params.email}}" class="btn grey">Atrás</router-link>
			<button class="btn green" @click="updateUser()">Guardar</button>
		</div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default {
		name: 'editar-usuario',
		data() {
			return {
				user: {}
			}
		},
		beforeRouteEnter(to, from, next) {
			db.collection('usuarios').where('email', '==', to.params.email).get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					next(vm => {
						vm.user = doc.data()
					})
				})
			})
		},
		watch: {
			'$route': 'fetchData'
		},
		methods: {
			fetchData() {
				db.collection('usuarios').where('email', '==', this.$route.params.email).get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						this.user = doc.data()
					})
				})
			},
			updateUser() {
				db.collection('usuarios').where('email', '==', this.$route.params.email).get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						doc.ref.update(this.user)
						.then(() => {
							this.$router.push({name: 'view-user', params: {email: this.$route.params.email}});
						})
					})
				})
			}
		}
	}
</script>
<style  scoped>
	.container-btns {
		width: 100%;
	    display: flex;
	    margin: 2em 0;
	    justify-content: space-between;
	}
</style>