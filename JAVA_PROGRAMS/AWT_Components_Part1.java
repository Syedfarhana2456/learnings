import java.awt.*;
import java.awt.event.*;

class AWTPart1 extends Frame implements ActionListener {
    Label label;
    TextField textField;
    Button button;

    AWTPart1() {
        setTitle("AWT Part 1 - Label, TextField, Button");
        setSize(400, 300);
        setLayout(null);
        setVisible(true);

        label = new Label("Enter your name:");
        label.setBounds(50, 50, 120, 30);
        add(label);

        textField = new TextField();
        textField.setBounds(180, 50, 150, 30);
        add(textField);

        button = new Button("Submit");
        button.setBounds(150, 100, 80, 30);
        add(button);

        button.addActionListener(this);

        
        addWindowListener(new WindowAdapter() {
            public void windowClosing(WindowEvent e) {
                dispose();
            }
        });
    }

    public void actionPerformed(ActionEvent e) {
        String name = textField.getText();
        System.out.println("Name entered: " + name);
    }
    public static void main(String[] args) {
        new AWTPart1();
    }
}
