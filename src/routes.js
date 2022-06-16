export default function routes() {
    return [
        {path: '/', name: 'home', component: () => import('./components/CalculatorComponent')},
        {path: '/cars/list', name:'car_list', component: () => import('./components/car/ListComponent')},
        {path: '/cars/add', name:'car_add', component: () => import('./components/car/CreateComponent')},
        {path: '/cars/edit/:id', name:'car_edit', component: () => import('./components/car/UpdateComponent')},
    ];
}