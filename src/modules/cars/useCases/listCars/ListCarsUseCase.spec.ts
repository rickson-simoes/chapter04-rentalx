import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "@modules/cars/useCases/listCars/ListCarsUseCase";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";

describe("List cars", () => {
  let listCarsUseCase: ListCarsUseCase;
  let carsRepository: CarsRepositoryInMemory;
  let createCarUseCase: CreateCarUseCase;

  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();

    createCarUseCase = new CreateCarUseCase(carsRepository);
    listCarsUseCase = new ListCarsUseCase(carsRepository);
  });

  it("Should be able to list all available cars", async () => {
    // PRIMEIRO JEITO QUE FIZ PARA CONSEGUIR TESTAR A LISTA DE CARROS

    // await createCarUseCase.execute({
    //   name: "name car",
    //   description: "description car",
    //   daily_rate: 100,
    //   license_plate: "ABC-1234",
    //   fine_amount: 60,
    //   brand: "Brand",
    //   category_id: "Category",
    // });

    // await createCarUseCase.execute({
    //   name: "name car 2",
    //   description: "description car 2",
    //   daily_rate: 130,
    //   license_plate: "ABC-1235",
    //   fine_amount: 80,
    //   brand: "Brand 2",
    //   category_id: "Category 2",
    // });

    // const cars = await listCarsUseCase.execute();

    // expect(cars).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({ name: "name car" }),
    //     expect.objectContaining({ name: "name car 2" }),
    //   ])
    // );

    const car = await carsRepository.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "Category",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car2",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Car_brand_test",
      category_id: "Category",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car]);
  });
});
