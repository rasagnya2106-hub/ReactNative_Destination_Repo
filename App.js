package:flutter/material.dart';

void main() {
  runApp(MinimalApp());
}

class MinimalApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Minimal App'),
        ),
        body: Center(
          child: Text('Hello, World!'),
        ),
      ),
    );
  }
}