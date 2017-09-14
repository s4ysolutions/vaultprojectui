const machina = require('machina');
const invariant = require('invariant');

module.exports = {
  fmsKVsEditor: new machina.BehavioralFsm({
    namespace: 'kvEditor',
    initialState: 'empty',
    // [[[states
    states: {
      // [[[ empty
      empty: {
        _onEnter (client) {
          client.state = {
            kvs: {},
            addingAt: 0,
            editingOf: false
          };
        },
        changeKVs (client, kvs) {
          if (Object.keys(kvs).length > 0) {
            client.state = {
              ...client.state,
              kvs
            };
            this.transition(client, 'addingLast', kvs);
          } else {
            this.transition(client, 'empty');
          }
        }
      },
      // ]]]
      // [[[ addingLast
      addingLast: {
        _onEnter (client) {
          const l = Object.keys(client.state.kvs).length;
          invariant(l > 0, 'This\' state must not be reached by empty object');
          client.state = {
            ...client.state,
            editingOf: false,
            addingAt: l - 1
          };
        },
        addAt (client, pos) {
          this.transition(client, 'addingAt', pos);
        },
        editOf (client, key) {
          this.transition(client, 'editingOf', key);
        },
        changeKVs (client, kvs) {
          client.state = {
            ...client.state,
            kvs
          };
          if (Object.keys(kvs).length > 0) {
            this.transition(client, 'addingLast', kvs);
          } else {
            this.transition(client, 'empty');
          }
        }
      },
      // ]]]
      // [[[ addingAt
      addingAt: {
        _onEnter (client, pos) {
          this._addAt(client, pos);
        },
        changeKVs (client, kvs) {
          const l = Object.keys(kvs).length;
          if (l === 0) {
            this.transition(client, 'empty');
          } else {
            if (Object.keys(kvs).length > 0) {
              client.state = {
                ...client.state,
                kvs
              };
            }
            this.transition(client, 'addingAt', client.addingAt);
          }
        },
        addAt (client, pos) {
          // This.transition(client, 'addingAt', pos);
          this._addAt(client, pos);
        },
        editOf (client, key) {
          this.transition(client, 'editingOf', key);
        },
        stopEdit: 'addingLast'
      },
      // ]]]
      // [[[ editingOf
      editingOf: {
        _onEnter (client, key) {
          const l = Object.keys(client.state.kvs).length;
          invariant(l > 0, 'This\' state must not be reached by empty object');
          invariant(
            typeof client.state.kvs[key] !== 'undefined',
            `This' state must have key "${key}"`
          );
          client.state = {
            ...client.state,
            editingOf: key,
            addingAt: false
          };
        },
        changeKVs (client, kvs) {
          client.state = {
            ...client.state,
            kvs
          };
          if (typeof kvs[client.state.editingOf] === 'undefined') {
            if (Object.keys(kvs).length > 0) {
              this.transition(client, 'addingLast');
            } else {
              this.transition(client, 'empty');
            }
          }
        },
        addAt (client, pos) {
          this.transition(client, 'addingAt', pos);
        },
        stopEdit (client) {
          invariant(
            Object.keys(client.state.kvs).length > 0,
            'This\' state must not be reached by empty object'
          );
          this.transition(client, 'addingLast');
        }
      }
      // ]]]
    },
    // ]]]
    // [[[ Utils
    _addAt (client, pos) {
      const l = Object.keys(client.state.kvs).length;
      invariant(l > 0, 'This\' state must not be reached by empty object');
      client.state = {
        ...client.state,
        editingOf: false,
        addingAt: Math.max(0, Math.min(l - 1, pos))
      };
    },
    // ]]]
    // [[[ API
    changeKVs (client, kvs) {
      this.handle(client, 'changeKVs', kvs);
    },
    addAt (client, pos) {
      this.handle(client, 'addAt', pos);
    },
    editOf (client, key) {
      this.handle(client, 'editOf', key);
    },
    stopEdit (client) {
      this.handle(client, 'stopEdit');
    }
    // ]]]
  })
};
