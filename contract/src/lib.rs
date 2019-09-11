// use std::error::Error;
use smart_contract_macros::smart_contract;

use smart_contract::log;
use smart_contract::payload::Parameters;
use std::collections::VecDeque;

struct Car {
    sender: [u8; 32],
    vin: String,
    owners_name: String,
    description: String,
    title: String,
    id: String
}
struct Car_check{
    vin:String
}

struct CarLog {
    logs: VecDeque<Car>
}

fn to_hex_string(bytes: [u8; 32]) -> String {
    let strs: Vec<String> = bytes.iter()
        .map(|b| format!("{:02x}", b))
        .collect();
    strs.join("")
}

#[smart_contract]
impl CarLog {
    fn init(_params: &mut Parameters) -> Self {
        Self { logs: VecDeque::new() }
    }
#[basic functions]
    fn log_car(&mut self, params: &mut Parameters) -> Result<(), String> {
        let car = Car {
            sender: params.sender, 
            vin:params.read(),
            owners_name: params.read(), 
            description: params.read(),
            title: params.read(),
            id: params.read()
      };
        if car.vin.len() == 0{
            return Err("Car must have vin".into());
        }
        if car.description.len() == 0 {
            return Err("Car must have description.".into());
        }
        if car.owners_name.len() == 0 {
            return Err("Car must have a owner's name.".into());
        }
        if car.title.len() == 0{
            return Err("Car must have title".into());
        }
        if car.id.len() == 0{
            return Err("Car must have id number".into());
        }
#[Push new car into logs]
        self.logs.push_back(car);
        Ok(())

    }
    fn get_cars(&mut self, _params: & mut Parameters) -> Result<(), String> {
        let mut vehicles = Vec::new();
        let car_check = Car_check {
            vin:params.read()
      };
        for car in &self.logs {
            if car_check.vin==car.vin{
            vehicles.insert(0, format!("<{}> {} {}", &to_hex_string(car.sender), car.owners_name, car.description()));
            }
            log(&vehicles.join("\n"))
        }
        log(&cars.join("\n"));
        Ok(())
    }
}