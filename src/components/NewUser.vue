<template>
	<div id="nuevo-usuario">
		<h3>Nuevo usuario</h3>
		<div class="row">
			<div class="col s12">
				<div class="row">
					<div class="input-field col s6">
						<input placeholder="Ingrese nombre" type="text" class="validate" v-model="user.nombre">
						<label for="first_name">Nombre</label>
					</div>
					<div class="input-field col s6">
						<input placeholder="Ingrese apellido" id="last_name" type="text" class="validate" v-model="user.apellido">
						<label for="last_name">Apellido</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6">
						<input placeholder="Ingrese email" id="email" type="email" class="validate" v-model="user.email">
						<label for="email">Email</label>
					</div>
					<div class="input-field col s6">
						<input placeholder="Ingrese telefono" id="telefono" type="text" class="validate" v-model="user.telefono">
						<label for="telefono">Teléfono</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6">
						<input placeholder="Ingrese edad" id="edad" type="text" class="validate" v-model="user.edad">
						<label for="edad">Edad</label>
					</div>
				</div>
			</div>
		</div>
		<div class="container-btns">
			<router-link to="/" class="btn grey">Atrás</router-link>
			<button class="btn green" @click="saveUser()">Guardar</button>
		</div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default {
		name: 'nuevo-usuario',
		data() {
			return {
				user: {}
			}
		},
		methods: {
			saveUser() {
				db.collection('usuarios').add(this.user)
				.then(docRef => this.$router.push('/'))
				.catch(err => console.log(err))
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