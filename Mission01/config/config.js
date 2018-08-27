module.exports = {
  server_port : 3000,
  db_url : 'mongodb://localhost:27017/local',
  db_schemas : [
    {file:'./user_schema',collection:'users6',schemaName:'UserSchema',modelName:'UserModel'},
    {file:'./coffeeshop_schema',collection:'coffeeshop',schemaName:'CoffeeShopSchema',modelName:'CoffeeShopModel'}
  ],

  route_info : [
    {file:'./coffeeshop',path:'/process/addcoffeeshop',method:'add',type:'post'},
    {file:'./coffeeshop',path:'/process/listcoffeeshop',method:'list',type:'post'}
  ],
}
