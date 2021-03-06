    /**
    * 
    * iskt skilar satt ef kennitalan er lögleg.
    * 
    * Höfundur: Stefán Berg Jansson.
    * 
    * Ég ábyrgist ekki neitt en ég gef þetta út sem public domain. Verði þér að góðu.
    * 
    */

   (function makeStringTrimGlobal() {
       'use strict';
       if (typeof String.prototype.trim !== 'function' || typeof String.trim !== 'function') {
           String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); };
       }
   }());
   function iskt(kt) {
       'use strict';
       var sum, testNumber, len, algo, isLegit, i;
       isLegit = false;
       if ((typeof kt === 'string')) {
           sum        = 0;
           testNumber = 0;
           algo       = [2, 3, 4, 5, 6, 7, 2, 3];//sjá http://is.wikipedia.org/wiki/Kennitala
           len        = kt.length;
           //færlægja bil á undan og eftir og fjarlægja "-" áður en við athugum löggildi kennitölunar.
           if (len > 10) {
               if (len > 11) {
                   kt  = kt.trim(); // eða kt.replace(/^\s+|\s+$/g, ''); ef þú villt ekki nota makeStringTrimGlobal().
                   kt  = kt.replace(/[\- ]/g, '');
                   len = kt.length;
               } else if (len === 11) {
                   kt  = kt.replace(/[\- ]/, '');
                   len = kt.length;
               }
           }
           //athugum löggildi kennitölunnar
           if (len === 10 && (!isNaN(kt))) {
               i = 8;
               while (i > 0) {
                   sum += parseInt(kt.charAt(i - 1), 10) * algo[(8 - i)];
                   i = i - 1;
               }
               testNumber = 11 - (sum % 11);
               // && ((kt.charAt(9) === '9') || (kt.charAt(9) === '0')) sem afmarkar til 2099
               if ((testNumber === parseInt(kt.charAt(8), 10)) || ((testNumber === 11) && (parseInt(kt.charAt(8), 10) === 0))) {
                   isLegit = true;
               }
           }
       }
       return isLegit;
   }
