import java.awt.*;
import java.awt.event.*;

class AWTPart2 extends Frame {
    TextArea ta;
    Choice choice;
    List list;

    AWTPart2() {
        setTitle("AWT Part 2 - TextArea, Choice, List");
        setSize(450, 350);
        setLayout(null);
        setVisible(true);

       
        ta = new TextArea("Write something here...");
        ta.setBounds(50, 50, 200, 100);
        add(ta);

        
        choice = new Choice();
        choice.add("CSE");
        choice.add("ECE");
        choice.add("EEE");
        choice.add("MECH");
        choice.setBounds(280, 50, 100, 30);
        add(choice);

       
        list = new List(4, true);
        list.add("Apple");
        list.add("Banana");
        list.add("Grapes");
        list.add("Mango");
        list.setBounds(280, 100, 100, 90);
        add(list);

        
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                dispose();
            }
        });
    }

    public static void main(String[] args) {
        new AWTPart2();
    }
}
