import connectDB from "@/database/dbConfig";
import Task from "@/database/models/task";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
        await connectDB();
        const tasks = await Task.find();
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        console.log('POST');
        await connectDB();
        let data = await request.json();
        // console.log(data);
        const task = new Task({...data});
        await task.save();
        const tasks = await Task.find();
        return NextResponse.json(tasks, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectDB();
        let data = await request.json();
        const task = await Task.findByIdAndUpdate(data.id, data, {
            new: true,
            runValidators: true
        });
        if (!task) {
            return NextResponse.json({
                error: "Task not found"
            }, { status: 404 });
        }
        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await connectDB();
        const { id } = request.query;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return NextResponse.json({
                error: "Task not found"
            }, { status: 404 });
        }
        return NextResponse.json(task, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}