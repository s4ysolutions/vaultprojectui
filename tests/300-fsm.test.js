const { kvEditor } = require('../src/machines');

describe('FSMs', () => {
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
      expect(editor.__machina__.kvEditor.state).to.be.equal('addingAt');
      expect(editor.state.addingAt).to.be.equal(0);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.addAt(editor, 1);
      expect(editor.__machina__.kvEditor.state).to.be.equal('addingAt');
      expect(editor.state.addingAt).to.be.equal(1);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.addAt(editor, Object.keys(kvs1).length);
      expect(editor.__machina__.kvEditor.state).to.be.equal('addingAt');
      expect(editor.state.addingAt).to.be.equal(Object.keys(kvs1).length - 1);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.editOf(editor, 'a');
      expect(editor.__machina__.kvEditor.state).to.be.equal('editingOf');
      expect(editor.state.addingAt).to.be.equal(false);
      expect(editor.state.editingOf).to.be.equal('a');
      const kvs2 = {
        b: 0,
        c: 1
      };
      kvEditor.changeKVs(editor, kvs2);
      expect(editor.__machina__.kvEditor.state).to.be.equal('addingLast');
      expect(editor.state.addingAt).to.be.equal(1);
      expect(editor.state.editingOf).to.be.equal(false);
      expect(editor.state.kvs).to.be.eql(kvs2);
      kvEditor.editOf(editor, 'b');
      expect(editor.__machina__.kvEditor.state).to.be.equal('editingOf');
      expect(editor.state.addingAt).to.be.equal(false);
      expect(editor.state.editingOf).to.be.equal('b');
      kvEditor.addAt(editor, Object.keys(kvs2).length);
      expect(editor.__machina__.kvEditor.state).to.be.equal('addingAt');
      expect(editor.state.addingAt).to.be.equal(Object.keys(kvs2).length - 1);
      expect(editor.state.editingOf).to.be.equal(false);
      kvEditor.editOf(editor, 'c');
      expect(editor.__machina__.kvEditor.state).to.be.equal('editingOf');
      expect(editor.state.addingAt).to.be.equal(false);
      expect(editor.state.editingOf).to.be.equal('c');
      kvEditor.stopEdit(editor);
      expect(editor.__machina__.kvEditor.state).to.be.equal('addingLast');
      expect(editor.state.addingAt).to.be.equal(Object.keys(kvs2).length - 1);
      expect(editor.state.editingOf).to.be.equal(false);
      done();
    });
  });
});
