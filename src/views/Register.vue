<template>
  <div class="login">
    <nav class="navbar navbar-expand-lg bg-body-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="/img/logo.jpg" width="40" height="40" alt="register" />
          <h5 class="blueCustom fw-bold">PLN</h5>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            <a class="nav-link" href="#">About</a>
            <a class="nav-link" href="#">Contact</a>
            <a class="nav-link" href="#">Log In</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card mb-3">
            <div class="card-body">
              <h3 class="card-title text-center">PLN</h3>
              <form @submit.prevent="registerUser">
                <div class="mb-3">
                  <label for="name" class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Enter name or email"
                    v-model="name"
                  />
                </div>
                <div class="mb-3">
                  <label for="position" class="form-label">Position</label>
                  <input
                    type="text"
                    class="form-control"
                    id="position"
                    placeholder="Enter position"
                    v-model="position"
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Enter email"
                    v-model="email"
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Enter password"
                      v-model="password"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      @click="togglePasswordVisibility"
                    >
                      <i :class="passwordFieldIcon"></i>
                    </button>
                  </div>
                </div>
                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary">Sign Up</button>
                  <button type="button" class="btn btn-danger">
                    <i class="fab fa-google"></i> Sign Up with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      name: '',
      email: '',
      position: '',
      password: '',
      passwordFieldType: 'password',
    };
  },
  computed: {
    passwordFieldIcon() {
      return this.passwordFieldType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
    },
  },
  methods: {
    registerUser() {
      if (this.name === '' || this.email === '' || this.position === '' || this.password === '') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill out all fields before signing up!',
          confirmButtonText: 'OK',
        });
        return;
      }

      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('email', this.email);
      formData.append('position', this.position);
      formData.append('password', this.password);

      axios.post('http://localhost:8000/api/auth/register', formData)
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: 'success',
              title: 'Registration successful!',
              text: 'Please log in to access the application.',
              confirmButtonText: 'OK',
            }).then(() => {
              this.$router.push('/login');
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'There was an error during registration.',
            });
          }
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'There was an error during registration.',
          });
        });
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
  },
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  margin-bottom: 1.5rem;
}

h1,
span {
  font-weight: bold;
  color: black;
}

.blueCustom {
  color: #2528b4;
}

.form-check-label {
  cursor: pointer;
}
</style>
