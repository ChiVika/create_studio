import { jsPDF } from "jspdf"
var font = './Inter_28pt-Regular.ttf';
var callAddFont = function () {
    this.addFileToVFS('Inter_28pt-Regular.ttf', font);
    this.addFont('Inter_28pt-Regular.ttf', 'Inter_28pt-Regular', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])
