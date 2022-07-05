import './style.css'
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alpine from 'alpinejs'
import Login from './alpine'

window.Alpine = Alpine

Alpine.data('open',Login)

Alpine.start()


