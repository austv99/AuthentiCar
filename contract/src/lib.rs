use std::error::Error;
use smart_contract_macros::smart_contract;

use smart_contract::log;
use smart_contract::payload::Parameters;
use std::collections::VecDeque;

struct Car {
    sender: [u8; 32],
    description: String,
}

struct CarLog {
    logs: VecDeque<Entry>
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
    fn log_car(&mut self, params: &mut Parameters) -> Result<(), String> {
        let car = Car {sender: params.sender, description: params.read()};
        if car.description.len() == 0 {
            return Err("Car must have description.".to_string());
        }
        // Push new car into logs
        self.logs.push_back(description)

        Ok(())

    }
    fn get_car(&mut self, _params: & mut Parameters) -> Result<(), String> {
        let mut cars = Vec::new();
        for vehicles in &self.logs {
            cars.insert(0, format!("<{}> {}", &to_hex_string(car.sender)[..16], car.description));
        }
        log(&cars.join("\n"));
        Ok(())
    }
}