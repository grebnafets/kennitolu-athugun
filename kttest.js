/**
 * 
 * iskt skilar satt ef kennitalan er lögleg.
 * 
 * Höfundur: Stefán Berg Jansson.
 * 
 * Ég ábyrgist ekki neitt en ég gef þetta út sem public domain. Verði þér að góðu.
 * 
 */

(function makeStringTrimGlobal() {//ég er með sérstað þar sem ég set niður öll global föll sem mér finnst meika sense...
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
                sum += parseInt(kt.substring((i - 1), i), 10) * algo[(8 - i)];
                i = i - 1;
            }
            testNumber = 11 - (sum % 11);
            // && ((kt.substring(9, 10) === '9') || (kt.substring(9, 10) === '0')) sem heldur sig til 2099
            if ((testNumber === parseInt(kt.substring(8, 9), 10)) || ((testNumber === 11) && (parseInt(kt.substring(8, 9), 10) === 0))) {
                isLegit = true;
            }
        }
    }
    /*
     * Má stroka út; þetta er bara til að skikka mig til að fylgjast betur með breytunum.
     */
    sum        = null;
    testNumber = null;
    len        = null;
    algo       = null;
    i          = null;
    /*
     * Má stroka út endar
     */
    return isLegit;
}
/*
 * Kóðin hér að neðan ætti að skýra sig sjálfan.
 * Ég myndi ekki gera bara copy paste heldur laga inn í fallið að ofan og sleppa óþarfa skrefum í þínu samhengi.
 * 
 * t.d
 * Hægt að gera: (int) yeartoday; if yeartoday > 2099 OR yeartoday < 1900 then yeartoday does not make sense
 * eða
 * is kt.substring(9, 10) === '9' or === '0'
 * 
 */
function isktcenturysensable(yearorkt) {
    'use strict';
    var len, isvalid, d, y, n;
    len = yearorkt.length;
    isvalid = false;
    if ((len === 10) && (typeof yearorkt === 'string')) {//kennitala, strengur
        d = new Date();
        y = d.getFullYear();
        n = y.substring(1, 2);
        if (yearorkt.substring(9, 10) === 9 || parseInt(yearorkt.substring(9, 10), 10) >= parseInt(n, 10)) {
            isvalid = true;
        }
    } else if (len === 4 && (typeof yearorkt === 'string')) {//ár, strengur
        d = new Date();
        y = d.getFullYear();
        n = y.substring(1, 2);
        if (yearorkt.substring(1, 2) === 9 || parseInt(yearorkt.substring(1, 2), 10) >= parseInt(n, 10)) {
            isvalid = true;
        }
    } else {
        throw new Error();
    }
    return isvalid;
}