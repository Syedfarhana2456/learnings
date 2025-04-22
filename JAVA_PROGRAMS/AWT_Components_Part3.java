import java.awt.*;
import java.awt.event.*;

class AWTPart3 extends Frame {
    Checkbox cb1, cb2;
    Checkbox rb1, rb2;
    Scrollbar sb;

    AWTPart3() {
        setTitle("AWT Part 3 - Checkbox, RadioButton, ScrollBar");
        setSize(400, 350);
        setLayout(null);
        setVisible(true);

        // Checkboxes
        cb1 = new Checkbox("Java");
        cb1.setBounds(50, 50, 100, 30);
        cb2 = new Checkbox("Python");
        cb2.setBounds(50, 90, 100, 30);
        add(cb1);
        add(cb2);

        // RadioButtons using CheckboxGroup
        CheckboxGroup gender = new CheckboxGroup();
        rb1 = new Checkbox("Male", gender, false);
        rb2 = new Checkbox("Female", gender, false);
        rb1.setBounds(200, 50, 100, 30);
        rb2.setBounds(200, 90, 100, 30);
        add(rb1);
        add(rb2);

        // ScrollBar
        sb = new Scrollbar(Scrollbar.HORIZONTAL, 0, 10, 0, 100);
        sb.setBounds(50, 150, 250, 30);
        add(sb);

        // Close window
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                dispose();
            }
        });
    }

    public static void main(String[] args) {
        new AWTPart3();
    }
}