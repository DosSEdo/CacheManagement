$(function () {

    var l = abp.localization.getResource('CacheManagement');

    var service = easyAbp.cacheManagement.cacheItems.cacheItem;
    var createModal = new abp.ModalManager(abp.appPath + 'CacheManagement/CacheItems/CacheItem/CreateModal');
    var editModal = new abp.ModalManager(abp.appPath + 'CacheManagement/CacheItems/CacheItem/EditModal');
    var clearCacheModal = new abp.ModalManager(abp.appPath + 'CacheManagement/CacheItems/CacheItem/ClearCacheModal');

    var dataTable = $('#CacheItemTable').DataTable(abp.libs.datatables.normalizeConfiguration({
        processing: true,
        serverSide: true,
        paging: true,
        searching: false,
        autoWidth: false,
        scrollCollapse: true,
        order: [[1, "asc"]],
        ajax: abp.libs.datatables.createAjax(service.getList),
        columnDefs: [
            {
                rowAction: {
                    items:
                        [
                            {
                                text: l('ClearCache'),
                                action: function (data) {
                                    clearCacheModal.open({ cacheItemId: data.record.id });
                                }
                            },
                            {
                                text: l('Edit'),
                                action: function (data) {
                                    editModal.open({ id: data.record.id });
                                }
                            },
                            {
                                text: l('Delete'),
                                confirmMessage: function (data) {
                                    return l('CacheItemDeletionConfirmationMessage', data.record.id);
                                },
                                action: function (data) {
                                    service.delete(data.record.id)
                                        .then(function () {
                                            abp.notify.info(l('SuccessfullyDeleted'));
                                            dataTable.ajax.reload();
                                        });
                                }
                            }
                        ]
                }
            },
            { data: "displayName" },
            { data: "description" },
        ]
    }));

    createModal.onResult(function () {
        dataTable.ajax.reload();
    });

    editModal.onResult(function () {
        dataTable.ajax.reload();
    });

    clearCacheModal.onResult(function () {
        dataTable.ajax.reload();
    });

    $('#NewCacheItemButton').click(function (e) {
        e.preventDefault();
        createModal.open();
    });
});