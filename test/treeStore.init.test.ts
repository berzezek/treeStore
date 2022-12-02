import type {item} from "../src/treeStore";
import {TreeStore} from "../src/treeStore";
import {suite, test} from "@testdeck/mocha";
import * as _chai from "chai";
import {assert, expect} from "chai";

_chai.should();
_chai.expect;

@suite
class TreeStoreTest {
  private treeStore: TreeStore;

  before() {
    const items: item[] = [
      {id: 1, parent: 'root'},
      {id: 2, parent: 1, type: 'test'},
      {id: 3, parent: 1, type: 'test'},

      {id: 4, parent: 2, type: 'test'},
      {id: 5, parent: 2, type: 'test'},
      {id: 6, parent: 2, type: 'test'},

      {id: 7, parent: 4, type: null},
      {id: 8, parent: 4, type: null},
    ];
    this.treeStore = new TreeStore(items);
  }

  @test "getData"() {
    const result = this.treeStore.data;
    expect(result.length).to.equal(8);
  }

  @test "setData"() {
    this.treeStore.data = [
      {id: 1, parent: 'root'},
      {id: 2, parent: 1, type: 'test'},
      {id: 3, parent: 1, type: 'test'},

      {id: 4, parent: 2, type: 'test'},
      {id: 5, parent: 2, type: 'test'},
      {id: 6, parent: 2, type: 'test'},

      {id: 7, parent: 4, type: null},
      {id: 8, parent: 4, type: null},
    ];
    const result = this.treeStore.data;
    expect(result.length).to.equal(8);
  }

  @test "getAll"() {
    const result = this.treeStore.getAll();
    expect(result.length).to.equal(8);
    expect(result).to.equal(this.treeStore.data);
    expect(result).to.eql(
      [
        {"id": 1, "parent": "root"},
        {"id": 2, "parent": 1, "type": "test"},
        {"id": 3, "parent": 1, "type": "test"},
        {"id": 4, "parent": 2, "type": "test"},
        {"id": 5, "parent": 2, "type": "test"},
        {"id": 6, "parent": 2, "type": "test"},
        {"id": 7, "parent": 4, "type": null},
        {"id": 8, "parent": 4, "type": null}
      ]
    );
  }

  @test "getItem"() {
    const result = this.treeStore.getItem(7);
    expect(result).to.equal(this.treeStore.data[6]);
    expect(result).to.eql({id: 7, parent: 4, type: null});
  }

  @test "getChildren"() {
    let result = this.treeStore.getChildren(4);
    expect(result.length).to.equal(2);
    expect(result).to.eql(
      [
        {"id": 7, "parent": 4, "type": null},
        {"id": 8, "parent": 4, "type": null}
      ]);
    result = this.treeStore.getChildren(5)
    expect(result).to.eql([])
    result = this.treeStore.getChildren(2)
    expect(result).to.eql(
      [
        {"id": 4, "parent": 2, "type": "test"},
        {"id": 5, "parent": 2, "type": "test"},
        {"id": 6, "parent": 2, "type": "test"}
      ]
    )
  }

  @test "getAllChildren"() {
    const result = this.treeStore.getAllChildren(2);
    expect(result.length).to.equal(5);
    expect(result).to.eql(
      [
        {"id": 4, "parent": 2, "type": "test"},
        {"id": 5, "parent": 2, "type": "test"},
        {"id": 6, "parent": 2, "type": "test"},
        {"id": 7, "parent": 4, "type": null},
        {"id": 8, "parent": 4, "type": null}
      ]
    )
  }

  @test "getAllParents"() {
    let result = this.treeStore.getAllParents(7);
    expect(result).to.eql(
      [
        {"id": 4, "parent": 2, "type": "test"},
        {"id": 2, "parent": 1, "type": "test"},
        {"id": 1, "parent": "root"}
      ]
    )
  }
}