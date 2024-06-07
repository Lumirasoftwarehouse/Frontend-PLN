<template>
    <div class="login">
        <div class="container-fluid">
            <div class="row">
                <div class="col-6">
                    <img src="/img/logo.jpg" width="40" height="40" alt="logo">
                    <h5 class="blueCustom fw-bold">PLN</h5>
                </div>
                <div class="col-6">
                    <a href="#" class="float-end">Sign Up</a>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-md-7">
                    <h1 class="blueCustom">Task</h1>
                    <h1>Project Management</h1>
                    <span>Energy Conservation Sustainable Solution</span><br>
                    <span>To be the Best Energy and Sustainability Services Provider</span>
                    <img src="/img/login/chart.png" alt="login" height="200">
                </div>
                <div class="col-md-5">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h3 class="card-title text-center">PLN</h3>
                            <form>
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username or Email</label>
                                    <input type="text" class="form-control" id="username" placeholder="Enter username or email">
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <div class="input-group">
                                        <input :type="passwordFieldType" class="form-control" id="password" placeholder="Enter password">
                                        <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                                            <i :class="passwordFieldIcon"></i>
                                        </button>
                                    </div>
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="rememberMe">
                                    <label class="form-check-label" for="rememberMe">Remember me</label>
                                    <a href="#" class="float-end">Forgot password?</a>
                                </div>
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary">Login</button>
                                    <button type="button" class="btn btn-danger">
                                        <i class="fab fa-google"></i> Login with Google
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <p>Don't have an account? <a href="#">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            passwordFieldType: 'password',
        };
    },
    computed: {
        passwordFieldIcon() {
            return this.passwordFieldType === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
        }
    },
    methods: {
        togglePasswordVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        }
    }
};
</script>

<style scoped>
.card {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
    margin-bottom: 1.5rem;
}

h1, span{
    font-weight: bold;
    color: black;
}

.blueCustom{
    color: #2528b4;   
}

.form-check-label {
    cursor: pointer;
}
</style>
