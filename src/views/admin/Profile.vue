<template>
  <div class="profile-container">
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card no-body class="overflow-hidden shadow-lg">
            <div class="profile-header">
              <img src="@/assets/profile.jpg" alt="Profile Image" class="profile-img">
            </div>
            <b-card-body class="text-center">
              <h3 class="profile-name">{{ name }}</h3>
              <h5 class="profile-position text-muted">{{ position }}</h5>
              <p class="profile-email text-secondary">{{ email }}</p>
              <b-button variant="primary" class="mr-2">Edit Profile</b-button>
              <b-button variant="outline-secondary">Settings</b-button>
              <div class="profile-social mt-3">
                <a href="#" class="text-info mr-2"><i class="fab fa-twitter fa-lg"></i></a>
                <a href="#" class="text-primary mr-2"><i class="fab fa-linkedin fa-lg"></i></a>
                <a href="#" class="text-dark"><i class="fab fa-github fa-lg"></i></a>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      position: 'Software Engineer',
    };
  },
};
</script>

<style scoped>
.profile-container {
  padding: 60px 0;
  background-color: #f0f2f5;
}

.profile-header {
  background-color: #343a40;
  padding: 20px;
  text-align: center;
}

.profile-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid #fff;
  box-shadow: 0 0 15px rgba(0,0,0,0.2);
  object-fit: cover;
}

.profile-name {
  font-size: 1.75rem;
  font-weight: bold;
  color: #343a40;
  margin-top: 10px;
}

.profile-position {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.profile-email {
  font-size: 1rem;
  margin-bottom: 20px;
}

.profile-social a {
  font-size: 1.5rem;
}

.profile-social a:hover {
  text-decoration: none;
  opacity: 0.8;
}
</style>
