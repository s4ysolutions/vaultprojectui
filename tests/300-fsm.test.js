const { kvEditor } = require('../src/machines');

describe.only('FSMs', () => {
  describe('KVs editor', () => {
    it('empty', (done) => {
      const editor = {};
      kvEditor.changeKVs(editor, {});
      expect(editor.__machina__.kvEditor.state).to.be.equal('empty');
      expect(editor.state.kvs).to.be.eql({});
      expect(editor.state.addingAt).to.be.eql(0);
      expect(editor.state.editingOf).to.be.equal(false);
      const kvs1 = {
        a: 1,
        b: 2
      };
      kvEditor.changeKVs(editor, kvs1);
      expect(editor.__machina__.kvEditor.state).to.be.equal('addingLast');
      expect(editor.state.kvs).to.be.eql(kvs1);
      expect(editor.state.addingAt).to.be.equal(1);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.addAt(editor, 0);
      expect(editor.state.addingAt).to.be.equal(0);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.addAt(editor, 1);
      expect(editor.state.addingAt).to.be.equal(1);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.addAt(editor, Object.keys(kvs1).length);
      expect(editor.state.addingAt).to.be.equal(1);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.editOf(editor, 'a');
      expect(editor.state.addingAt).to.be.equal(false);
      expect(editor.state.editingOf).to.be.equal('a');
      const kvs2 = {
        b: 0,
        c: 1
      };
      kvEditor.changeKVs(editor, kvs2);
      expect(editor.state.addingAt).to.be.equal(1);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.editOf(editor, 'b');
      expect(editor.state.addingAt).to.be.equal(false);
      expect(editor.state.editingOf).to.be.equal('b');
      done();
    });
  });
});
