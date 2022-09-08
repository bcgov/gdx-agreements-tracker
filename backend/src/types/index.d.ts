export interface IController {
    getAll: (request: any, reply: any) => Promise<Object>;
    getOne: (request: any, reply: any) => Promise<Object>;
    addOne: (request: any, reply: any) => Promise<Object>;
    updateOne: (request: any, reply: any) => Promise<Object>;
    deleteOne: (request: any, reply: any) => Promise<Object>;
    getByEmail?: (request: any, reply: any) => Promise<Object>;
    getContractAmendment?: (request: any, reply: any) => Promise<Object>;
    findById?: (request: any, reply: any) => Promise<Object>;
    findAllByUserId?: (request: any, reply: any) => Promise<Object>;
  }