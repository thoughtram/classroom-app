export let ClassroomLoadingSpinnerModule = angular.module('classroom.loading_spinner', [])

.directive('crLoadingSpinner', () => {
  return {
    template: `
      <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
      </div>`
      // template: `
      //   <div class="flex-container">
      //     <div class="preloader-wrapper active">
      //       <div class="spinner-layer spinner-blue-only">
      //         <div class="circle-clipper left">
      //           <div class="circle"></div>
      //         </div><div class="gap-patch">
      //           <div class="circle"></div>
      //         </div><div class="circle-clipper right">
      //           <div class="circle"></div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>`,
  };
});
