import {expect} from "chai";
import Index from "./index";

describe("Index", ()=>{
  it("says hello to someone", ()=>{
    expect(new Index().hello("<%= authorName %>"), "Hello <%= authorName %>");
  });
});
