var addBtn = $('#addUser'),
    removeBtns = $('.removeItem');

var options = {
    valueNames: [
        { data: ['id'] },
        'itemId',
        { attr: 'value', name: 'name' },
        { attr: 'value', name: 'born' },
        { attr: 'data-value', name: 'device' },
        { attr: 'value', name: 'joinAt' }
    ],
    item: `<tr class="id" data-id="">
      <td><span class="itemId"></span></td>
      <td><input class="name uk-input" value=""></td>
      <td><input class="born uk-input" value=""></td>
      <td>
        <select class="device uk-select" name="device[]">
          <option class="deviceType" data-value="iOS">iOS</option>
          <option class="deviceType" value="android">Android</option>
        </select>
      </td>
      <td>
          <input type="text" class="joinAt uk-input" value=""/>
      </td>
      <td>
         <a title="Xóa" class="removeItem uk-button uk-button-danger uk-button-small uk-border-circle uk-padding-x"><i class="fas fa-trash"></i></a>
      </td>
    </tr>`
};

// Prepare initial user data
var values = [{
        id: 1,
        itemId: '#1',
        name: 'Jonny Strömberg',
        born: 1986,
        device: 'iOS',
        joinAt: 'a'
    },
    {
        id: 2,
        itemId: '#2',
        name: 'Jonas Arnklint',
        born: 1985,
        device: 'iOS',
        joinAt: 'b'
    },
    {
        id: 3,
        itemId: '#3',
        name: 'Martina Elm',
        born: 1986,
        device: 'android',
        joinAt: 'c'
    }
];

// Create user list
var userList = new List('users', options, values);

// Add one more item into list
userList.add({
    id: 4,
    itemId: '#4',
    name: "Gustaf Lindqvist",
    born: 1983,
    device: 'android',
    joinAt: 'd'
});

// Get size of list (except headers)
var size = userList.size();

// Sets callbacks to the buttons and other elements in the list
refreshCallbacks();

function refreshCallbacks() {
    // Trigger event for new generated row/object
    removeBtns = $(removeBtns.selector);
    removeBtns.click(function() {
        var itemId = $(this).closest('tr').data('id');
        userList.remove('id', itemId);
    });

    // Re-set device of each select
    let deviceOptions = $('.deviceType');
    deviceOptions.each(function() {
        let parentSelect = $(this).closest('select').data('value');
        if (parentSelect === this.value) {
            $(this).attr('selected', 'selected');
        }
    });

}

// Add new blank row into tables if click button Add
addBtn.click(function() {
    userList.add({
        id: ++size,
        itemId: `#${size}`,
        name: "",
        born: "",
        joinAt: ""
    });
    refreshCallbacks();
});