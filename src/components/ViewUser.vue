<template>
	<div id="view-usuario">
		<h3 class="center-align">Datos</h3>
		<table class="striped centered responsive-table">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Email</th>
					<th>Teléfono</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>{{user.nombre}}</td>
					<td>{{user.apellido}}</td>
					<td>{{user.email}}</td>
					<td>{{user.telefono}}</td>
				</tr>
			</tbody>
		</table><br>
		<h4 class="center-align">Pagos</h4>
		<table class="striped centered responsive-table">
			<thead>
				<tr>
					<th>Pago</th>
					<th>Dias de entrenamiento</th>
					<th>Fecha</th>
					<th>Borrar</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(pago, key) in user.pagos">
					<td>${{pago.pago}}</td>
					<td>{{pago.dias}} días a la semana</td>
					<td>{{$moment(pago.fecha).format('DD/MM/YYYY')}}</td>
					<td>
						<a href="#" @click="deletePago($event, key)"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-if="modalPagos" class="row box-pagos">
			<h5>Agregar pago</h5>
			<div class="input-field col s4">
				<input placeholder="$1000" type="text" class="validate" v-model="newPago.pago">
			</div>
			<div class="input-field col s4">
				<input placeholder="Ingrese cantidad de dias" type="text" class="validate" v-model="newPago.dias">
			</div>
			<div class="input-field col s4">
				<input placeholder="Ingrese fecha pago" type="date" class="validate" v-model="newPago.fecha">
			</div>
			<button class="btn orange right-align" @click="AgregarPago()">Agregar</button>
		</div>
		<div class="container-btns">
			<router-link to="/" class="btn grey">Atrás</router-link>
			<button class="btn red" @click="deleteUser()">Borrar</button>
		</div>
		<div class="fixed-action-btn">
			<button class="btn-floating btn-large green" @click="modalPagos = true">
				<i class="fa fa-money"></i>
			</button>
			<router-link :to="{name: 'edit-user', params: {email: this.$route.params.email}}" class="btn-floating btn-large orange">
				<i class="fa fa-pencil"></i>
			</router-link>
		</div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default {
		name: 'view-usuario',
		data() {
			return {
				user: {},
				modalPagos: false,
				newPago: {}
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
			deleteUser() {
				db.collection('usuarios').where('email', '==', this.$route.params.email).get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						doc.ref.delete();
						this.$router.push({name: 'dashboard'});
					})
				})
			},
			AgregarPago() {
				if(this.user.pagos === undefined) {
					this.user.pagos = [this.newPago];
				}else {
					this.user.pagos.push(this.newPago);
				}
				this.updateUser();
			},
			deletePago(e, key) {
				e.preventDefault();
				this.user.pagos.splice(key, 1);
				this.updateUser();
			},
			updateUser() {
				db.collection('usuarios').where('email', '==', this.$route.params.email).get()
				.then(snapshot => {
					snapshot.forEach(doc => {
						doc.ref.update(this.user)
						.then(() => {
							this.newPago = {};
							this.modalPagos = false;
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
	.box-pagos {
		border: 1px solid #dadada;
	    padding: 1em;
	    border-radius: 1em;
	    margin-top: 2em;
	}
</style>