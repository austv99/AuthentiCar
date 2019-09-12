use smart_contract_macros::smart_contract;

use smart_contract::log;
use smart_contract::payload::Parameters;
use std::collections::VecDeque;

struct Car {
    description: String,
}

struct CarLog {
    logs: VecDeque<Car>,
}

// const MAX_LOG_CAPACITY: usize = 50;
// const MAX_MESSAGE_SIZE: usize = 240;

// fn prune_old_messages(chat: &mut Chat) {
//     if chat.logs.len() > MAX_LOG_CAPACITY {
//         chat.logs.pop_front();
//     }
// }

// fn to_hex_string(bytes: [u8; 32]) -> String {
//     let strs: Vec<String> = bytes.iter().map(|b| format!("{:02x}", b)).collect();
//     strs.join("")
// }

#[smart_contract]
impl CarLog {
    fn init(_params: &mut Parameters) -> Self {
        Self {
            logs: VecDeque::new(),
        }
    }

    fn log_car(&mut self, params: &mut Parameters) -> Result<(), String> {
        let car = Car {
            description: params.read(),
        };

        // Ensure that messages are not empty.
        if car.description.len() == 0 {
            return Err("Description must not be empty.".into());
        }

        // Ensure that message are at most 240 characters.
        // if entry.message.len() > MAX_MESSAGE_SIZE {
        //     return Err(format!(
        //         "Message must not be more than {} characters.",
        //         MAX_MESSAGE_SIZE
        //     ));
        // }

        // Push chat message into logs.
        self.logs.push_back(car);

        // Prune old messages if necessary.
        // prune_old_messages(self);

        Ok(())
    }

    fn get_cars(&mut self, _params: &mut Parameters) -> Result<(), String> {
        let mut cars = Vec::new();

        for car in &self.logs {
            cars.insert(
                0,
                format!("{}", car.description),
            );
        }

        log(&cars.join("\n"));

        Ok(())
    }
}