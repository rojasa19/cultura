<template>
	<div id="dashboard">
		<h3>Dashboard</h3>
		<table class="striped responsive-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Nombre</th>
					<th>Apellido</th>
					<th>Email</th>
					<th>Teléfono</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(usuario, key) in usuarios" :key="usuario.id">
					<td>{{key}}</td>
					<td>{{usuario.nombre}}</td>
					<td>{{usuario.apellido}}</td>
					<td>{{usuario.email}}</td>
					<td>{{usuario.telefono}}</td>
					<td>
						<router-link :to="{name: 'view-user', params: {email: usuario.email}}">
							<i class="fa fa-eye"></i>
						</router-link>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="fixed-action-btn">
			<router-link to="/new" class="btn-floating btn-large orange">
				<i class="fa fa-plus"></i>
			</router-link>
		</div>
	</div>
</template>
<script>
	import db from './firebaseInit'
	export default {
		name: 'dashboard',
		data() {
			return {
				usuarios: []
			}
		},
		created() {
			db.collection('usuarios').get().then(snapshot => {
				snapshot.forEach(doc => {
					const data = {
						'id': doc.id,
						'nombre': doc.data().nombre,
						'apellido': doc.data().apellido,
						'email': doc.data().email,
						'telefono': doc.data().telefono,
						'edad': doc.data().edad
					}
					this.usuarios.push(data)
				})
			})
		}
	}
</script>