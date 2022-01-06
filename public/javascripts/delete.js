// delete.js is only applied to index.hbs and edit.hbs
const deleteButtons = document.querySelectorAll('.delete-button')


// loop all queried delete buttons DOM object
deleteButtons.forEach(deleteButton => {
  console.log("go")
  // attach event listeners for each of them 
  deleteButton.addEventListener('click', function onDeleteButtonClicked(event) {
    console.log("go")
    const id = deleteButton.dataset.id

    // trigger SweetAlert package for dialogue
    Swal.fire({
      // SweetAlert dialogue configuration
      title: '確定要刪除嗎?',
      text: "一但執行，刪除的檔案是無法恢復的唷!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '確定!',
      cancelButtonText: '取消!'
    }).then(result => {
      // if confirmed, then return something
      if (result.isConfirmed) {
        return Swal.fire(
          '紀錄已經刪除!',
          '掰掰了',
          'success'
        )
      }
    }).then(result => {
      // if catch returned object, then delete
      if (result) {
        axios.delete(`/records/${id}`)
          .catch(err => console.log(err))
      }
    })
  })
})